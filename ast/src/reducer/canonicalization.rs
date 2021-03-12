// Copyright (C) 2019-2021 Aleo Systems Inc.
// This file is part of the Leo library.

// The Leo library is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// The Leo library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with the Leo library. If not, see <https://www.gnu.org/licenses/>.

use crate::*;
use indexmap::IndexMap;

pub struct Canonicalizer;

impl Canonicalizer {
    fn _is_self(&self, identifier: &Identifier) -> bool {
        matches!(identifier.name.as_str(), "Self")
    }

    fn is_self_type(&self, type_option: Option<&Type>) -> bool {
        matches!(type_option, Some(Type::SelfType))
    }

    fn _canonicalize_function_input(&self, function_input: &FunctionInput, circuit_name: &Identifier) -> FunctionInput {
        match function_input {
            FunctionInput::SelfKeyword(self_keyword) => {
                return FunctionInput::Variable(FunctionInputVariable {
                    identifier: circuit_name.clone(),
                    const_: false,
                    mutable: false,
                    type_: Type::Circuit(circuit_name.clone()),
                    span: self_keyword.span.clone(),
                });
            }
            FunctionInput::MutSelfKeyword(mut_self_keyword) => {
                return FunctionInput::Variable(FunctionInputVariable {
                    identifier: circuit_name.clone(),
                    const_: false,
                    mutable: true,
                    type_: Type::Circuit(circuit_name.clone()),
                    span: mut_self_keyword.span.clone(),
                });
            }
            _ => {}
        }

        function_input.clone()
    }

    fn canonicalize_expression(&self, expression: &Expression, circuit_name: &Identifier) -> Expression {
        match expression {
            Expression::CircuitInit(circuit_init) => {
                return Expression::CircuitInit(CircuitInitExpression {
                    name: circuit_name.clone(),
                    members: circuit_init.members.clone(),
                    span: circuit_init.span.clone(),
                });
            }
            Expression::CircuitMemberAccess(circuit_member_access) => {
                return Expression::CircuitMemberAccess(CircuitMemberAccessExpression {
                    circuit: Box::new(self.canonicalize_expression(&circuit_member_access.circuit, circuit_name)),
                    name: circuit_member_access.name.clone(),
                    span: circuit_member_access.span.clone(),
                });
            }
            Expression::CircuitStaticFunctionAccess(circuit_static_func_access) => {
                return Expression::CircuitStaticFunctionAccess(CircuitStaticFunctionAccessExpression {
                    circuit: Box::new(self.canonicalize_expression(&circuit_static_func_access.circuit, circuit_name)),
                    name: circuit_static_func_access.name.clone(),
                    span: circuit_static_func_access.span.clone(),
                });
            }
            Expression::Call(call) => {
                return Expression::Call(CallExpression {
                    function: Box::new(self.canonicalize_expression(&call.function, circuit_name)),
                    arguments: call.arguments.clone(),
                    span: call.span.clone(),
                });
            }
            _ => {}
        }

        expression.clone()
    }

    fn canonicalize_statement(&self, statement: &Statement, circuit_name: &Identifier) -> Statement {
        // What Statements could have Self appear

        match statement {
            Statement::Return(return_statement) => {
                return Statement::Return(ReturnStatement {
                    expression: self.canonicalize_expression(&return_statement.expression, circuit_name),
                    span: return_statement.span.clone(),
                });
            }
            Statement::Definition(definition) => {
                let mut type_ = definition.type_.clone();

                if self.is_self_type(type_.as_ref()) {
                    type_ = Some(Type::Circuit(circuit_name.clone()));
                }

                return Statement::Definition(DefinitionStatement {
                    declaration_type: definition.declaration_type.clone(),
                    variable_names: definition.variable_names.clone(),
                    type_,
                    value: self.canonicalize_expression(&definition.value, circuit_name),
                    span: definition.span.clone(),
                });
            }
            Statement::Expression(expression) => {
                return Statement::Expression(ExpressionStatement {
                    expression: self.canonicalize_expression(&expression.expression, circuit_name),
                    span: expression.span.clone(),
                });
            }
            Statement::Block(block) => {
                return Statement::Block(Block {
                    statements: block
                        .statements
                        .iter()
                        .map(|block_statement| self.canonicalize_statement(&block_statement, circuit_name))
                        .collect(),
                    span: block.span.clone(),
                });
            }
            _ => {}
        }

        statement.clone()
    }

    fn canonicalize_circuit_member(&self, circuit_member: &CircuitMember, circuit_name: &Identifier) -> CircuitMember {
        match circuit_member {
            CircuitMember::CircuitVariable(_, _) => {}
            CircuitMember::CircuitFunction(function) => {
                let input = function.input.clone();
                let mut output = function.output.clone();
                let block = Block {
                    statements: function
                        .block
                        .statements
                        .iter()
                        .map(|statement| self.canonicalize_statement(statement, circuit_name))
                        .collect(),
                    span: function.block.span.clone(),
                };

                if self.is_self_type(output.as_ref()) {
                    output = Some(Type::Circuit(circuit_name.clone()));
                }

                return CircuitMember::CircuitFunction(Function {
                    annotations: function.annotations.clone(),
                    identifier: function.identifier.clone(),
                    input,
                    output,
                    block,
                    span: function.span.clone(),
                });
            }
        }

        circuit_member.clone()
    }
}

impl ReconstructingReducer for Canonicalizer {
    fn reduce_type(&mut self, _type_: &Type, new: Type) -> Type {
        match new {
            Type::Array(_, mut dimensions) => {
                // TODO need to throw errors in all these.
                // Throw error if dimensions is empty.
                let mut next = Type::Array(
                    Box::new(Type::Group),
                    ArrayDimensions(vec![dimensions.remove_last().unwrap()]),
                );
                let mut array = next.clone();
                loop {
                    if dimensions.is_empty() {
                        break;
                    }

                    array = Type::Array(Box::new(next), ArrayDimensions(vec![dimensions.remove_last().unwrap()]));
                    next = array.clone();
                }

                array
            }
            _ => new.clone(),
        }
    }

    fn reduce_array_init(&mut self, array_init: &ArrayInitExpression, element: Expression) -> ArrayInitExpression {
        // TODO ERROR HERE if len is 0
        let element = Box::new(element);

        if array_init.dimensions.0.len() == 1 {
            return ArrayInitExpression {
                element,
                dimensions: array_init.dimensions.clone(),
                span: array_init.span.clone(),
            };
        }

        let mut dimensions = array_init.dimensions.clone();

        let mut next = Expression::ArrayInit(ArrayInitExpression {
            element,
            dimensions: ArrayDimensions(vec![dimensions.remove_last().unwrap()]),
            span: array_init.span.clone(),
        });

        let mut outer_element = Box::new(next.clone());
        for (index, dimension) in dimensions.0.iter().rev().enumerate() {
            if index == dimensions.0.len() - 1 {
                break;
            }

            next = Expression::ArrayInit(ArrayInitExpression {
                element: outer_element,
                dimensions: ArrayDimensions(vec![dimension.clone()]),
                span: array_init.span.clone(),
            });
            outer_element = Box::new(next.clone());
        }

        ArrayInitExpression {
            element: outer_element,
            dimensions: ArrayDimensions(vec![dimensions.remove_first().unwrap()]),
            span: array_init.span.clone(),
        }
    }

    fn reduce_assign(&mut self, assign: &AssignStatement, assignee: Assignee, value: Expression) -> AssignStatement {
        match value {
            Expression::Value(value) => {
                let left = Box::new(Expression::Identifier(assignee.identifier.clone()));
                let right = Box::new(Expression::Value(value));
                let op = match assign.operation {
                    AssignOperation::Assign => BinaryOperation::Eq,
                    AssignOperation::Add => BinaryOperation::Add,
                    AssignOperation::Sub => BinaryOperation::Sub,
                    AssignOperation::Mul => BinaryOperation::Mul,
                    AssignOperation::Div => BinaryOperation::Div,
                    AssignOperation::Pow => BinaryOperation::Pow,
                    AssignOperation::Or => BinaryOperation::Or,
                    AssignOperation::And => BinaryOperation::And,
                    AssignOperation::BitOr => BinaryOperation::BitOr,
                    AssignOperation::BitAnd => BinaryOperation::BitAnd,
                    AssignOperation::BitXor => BinaryOperation::BitXor,
                    AssignOperation::Shr => BinaryOperation::Shr,
                    AssignOperation::ShrSigned => BinaryOperation::ShrSigned,
                    AssignOperation::Shl => BinaryOperation::Shl,
                    AssignOperation::Mod => BinaryOperation::Mod,
                };

                let value = Expression::Binary(BinaryExpression {
                    left,
                    right,
                    op,
                    span: assign.span.clone(),
                });

                AssignStatement {
                    operation: assign.operation.clone(),
                    assignee,
                    value,
                    span: assign.span.clone(),
                }
            }
            _ => assign.clone(),
        }
    }

    // fn reduce_circuit(&mut self, _circuit: &Circuit, circuit_name: Identifier, members: Vec<CircuitMember>) -> Circuit {
    //     Circuit {
    //         circuit_name: circuit_name.clone(),
    //         members: members
    //             .iter()
    //             .map(|member| self.canonicalize_circuit_member(member, &circuit_name))
    //             .collect(),
    //     }
    // }
}
