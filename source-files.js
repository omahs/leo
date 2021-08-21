var N = null;var sourcesIndex = {};
sourcesIndex["leo"] = {"name":"","dirs":[{"name":"commands","dirs":[{"name":"package","files":["add.rs","clone.rs","fetch.rs","login.rs","logout.rs","mod.rs","publish.rs","remove.rs"]}],"files":["build.rs","clean.rs","deploy.rs","init.rs","lint.rs","mod.rs","new.rs","prove.rs","run.rs","setup.rs","test.rs","update.rs","watch.rs"]}],"files":["api.rs","config.rs","context.rs","logger.rs","main.rs","updater.rs"]};
sourcesIndex["leo_abnf"] = {"name":"","files":["main.rs"]};
sourcesIndex["leo_asg"] = {"name":"","dirs":[{"name":"checks","files":["mod.rs","return_path.rs"]},{"name":"expression","files":["array_access.rs","array_init.rs","array_inline.rs","array_range_access.rs","binary.rs","call.rs","cast.rs","circuit_access.rs","circuit_init.rs","constant.rs","mod.rs","ternary.rs","tuple_access.rs","tuple_init.rs","unary.rs","variable_ref.rs"]},{"name":"program","files":["circuit.rs","function.rs","mod.rs"]},{"name":"reducer","dirs":[{"name":"monoid","files":["bool_and.rs","mod.rs","set_append.rs","vec_append.rs"]}],"files":["mod.rs","monoidal_director.rs","monoidal_reducer.rs","reconstructing_director.rs","reconstructing_reducer.rs","visitor.rs","visitor_director.rs"]},{"name":"statement","files":["assign.rs","block.rs","conditional.rs","console.rs","definition.rs","expression.rs","iteration.rs","mod.rs","return_.rs"]}],"files":["const_value.rs","context.rs","import.rs","input.rs","lib.rs","node.rs","pass.rs","prelude.rs","scope.rs","type_.rs","variable.rs"]};
sourcesIndex["leo_asg_passes"] = {"name":"","dirs":[{"name":"constant_folding","files":["mod.rs"]},{"name":"dead_code_elimination","files":["mod.rs"]}],"files":["lib.rs"]};
sourcesIndex["leo_ast"] = {"name":"","dirs":[{"name":"chars","files":["char_value.rs","mod.rs"]},{"name":"circuits","files":["circuit.rs","circuit_implied_variable_definition.rs","circuit_member.rs","circuit_variable_definition.rs","mod.rs"]},{"name":"common","files":["array_dimensions.rs","const_self_keyword.rs","identifier.rs","mod.rs","mut_self_keyword.rs","positive_number.rs","self_keyword.rs","spread_or_expression.rs","vec_tendril_json.rs"]},{"name":"expression","files":["array_access.rs","array_init.rs","array_inline.rs","array_range_access.rs","binary.rs","call.rs","cast.rs","circuit_init.rs","circuit_member_access.rs","circuit_static_function_access.rs","mod.rs","ternary.rs","tuple_access.rs","tuple_init.rs","unary.rs","value.rs"]},{"name":"functions","dirs":[{"name":"input","files":["function_input.rs","input_variable.rs","mod.rs"]}],"files":["function.rs","mod.rs"]},{"name":"groups","files":["group_coordinate.rs","group_value.rs","mod.rs"]},{"name":"imports","files":["import.rs","import_symbol.rs","mod.rs","package.rs","package_access.rs","package_or_packages.rs","packages.rs"]},{"name":"input","dirs":[{"name":"parameters","files":["mod.rs","parameter.rs"]},{"name":"program_input","files":["constant_input.rs","main_input.rs","mod.rs","program_input.rs","registers.rs"]},{"name":"program_state","dirs":[{"name":"private_state","files":["mod.rs","private_state.rs","record.rs","state_leaf.rs"]},{"name":"public_state","files":["mod.rs","public_state.rs","state.rs"]}],"files":["mod.rs","program_state.rs"]}],"files":["input.rs","input_value.rs","macros.rs","mod.rs"]},{"name":"reducer","files":["canonicalization.rs","mod.rs","reconstructing_director.rs","reconstructing_reducer.rs"]},{"name":"statements","dirs":[{"name":"assign","files":["assignee.rs","mod.rs"]},{"name":"console","files":["console_args.rs","console_function.rs","console_statement.rs","mod.rs"]},{"name":"definition","files":["declare.rs","mod.rs","variable_name.rs"]}],"files":["block.rs","conditional.rs","expression.rs","iteration.rs","mod.rs","return_statement.rs","statement.rs"]},{"name":"types","files":["integer_type.rs","mod.rs","type_.rs"]}],"files":["annotation.rs","lib.rs","node.rs","program.rs"]};
sourcesIndex["leo_compiler"] = {"name":"","dirs":[{"name":"console","files":["assert.rs","console.rs","format.rs","mod.rs"]},{"name":"constraints","files":["constraints.rs","mod.rs"]},{"name":"definition","files":["definition.rs","mod.rs"]},{"name":"expression","dirs":[{"name":"arithmetic","files":["add.rs","bit_not.rs","div.rs","mod.rs","mul.rs","negate.rs","pow.rs","sub.rs"]},{"name":"array","files":["access.rs","array.rs","index.rs","mod.rs"]},{"name":"binary","files":["binary.rs","mod.rs"]},{"name":"circuit","files":["access.rs","circuit.rs","mod.rs"]},{"name":"conditional","files":["conditional.rs","mod.rs"]},{"name":"function","files":["core_circuit.rs","function.rs","mod.rs"]},{"name":"logical","files":["and.rs","mod.rs","not.rs","or.rs"]},{"name":"relational","files":["eq.rs","ge.rs","gt.rs","le.rs","lt.rs","mod.rs"]},{"name":"tuple","files":["access.rs","mod.rs","tuple.rs"]},{"name":"variable_ref","files":["mod.rs","variable_ref.rs"]}],"files":["expression.rs","mod.rs"]},{"name":"function","dirs":[{"name":"input","files":["array.rs","input_keyword.rs","input_section.rs","main_function_input.rs","mod.rs","tuple.rs"]},{"name":"result","files":["mod.rs","result.rs"]}],"files":["function.rs","main_function.rs","mod.rs","mut_target.rs"]},{"name":"output","files":["mod.rs","output_bytes.rs","output_file.rs"]},{"name":"phases","files":["mod.rs","phase.rs","reducing_director.rs"]},{"name":"prelude","files":["blake2s.rs","mod.rs"]},{"name":"program","files":["mod.rs","program.rs"]},{"name":"statement","dirs":[{"name":"assign","dirs":[{"name":"assignee","files":["array_index.rs","array_range_index.rs","member.rs","mod.rs","tuple.rs"]}],"files":["assign.rs","mod.rs"]},{"name":"block","files":["block.rs","mod.rs"]},{"name":"conditional","files":["conditional.rs","mod.rs"]},{"name":"definition","files":["definition.rs","mod.rs"]},{"name":"iteration","files":["iteration.rs","mod.rs"]},{"name":"return_","files":["mod.rs","return_.rs"]}],"files":["mod.rs","statement.rs"]},{"name":"value","dirs":[{"name":"address","files":["address.rs","mod.rs"]},{"name":"boolean","files":["input.rs","mod.rs"]},{"name":"char","files":["char.rs","mod.rs"]},{"name":"field","files":["field_type.rs","input.rs","mod.rs"]},{"name":"group","dirs":[{"name":"targets","files":["edwards_bls12.rs","mod.rs"]}],"files":["group_type.rs","input.rs","mod.rs"]},{"name":"integer","files":["integer.rs","macros.rs","mod.rs"]}],"files":["mod.rs","value.rs"]}],"files":["compiler.rs","lib.rs","option.rs","phase.rs"]};
sourcesIndex["leo_errors"] = {"name":"","dirs":[{"name":"asg","files":["asg_errors.rs","mod.rs"]},{"name":"ast","files":["ast_errors.rs","mod.rs"]},{"name":"cli","files":["cli_errors.rs","mod.rs"]},{"name":"common","files":["backtraced.rs","formatted.rs","macros.rs","mod.rs","span.rs","tendril_json.rs","traits.rs"]},{"name":"compiler","files":["compiler_errors.rs","mod.rs"]},{"name":"import","files":["import_errors.rs","mod.rs"]},{"name":"package","files":["mod.rs","package_errors.rs"]},{"name":"parser","files":["mod.rs","parser_errors.rs"]},{"name":"snarkvm","files":["mod.rs","snarkvm_errors.rs"]},{"name":"state","files":["mod.rs","state_errors.rs"]}],"files":["lib.rs"]};
sourcesIndex["leo_imports"] = {"name":"","dirs":[{"name":"parser","files":["import_parser.rs","mod.rs","parse_package.rs","parse_symbol.rs"]}],"files":["lib.rs"]};
sourcesIndex["leo_input"] = {"name":"","dirs":[{"name":"common","files":["eoi.rs","identifier.rs","line_end.rs","mod.rs"]},{"name":"definitions","files":["definition.rs","mod.rs"]},{"name":"errors","files":["mod.rs","parser.rs","syntax.rs"]},{"name":"expressions","files":["array_initializer_expression.rs","array_inline_expression.rs","expression.rs","mod.rs","string_expression.rs","tuple_expression.rs"]},{"name":"files","files":["file.rs","mod.rs","table_or_section.rs"]},{"name":"parameters","files":["mod.rs","parameter.rs"]},{"name":"sections","files":["constants.rs","header.rs","main_.rs","mod.rs","record.rs","registers.rs","section.rs","state.rs","state_leaf.rs"]},{"name":"tables","files":["mod.rs","private.rs","public.rs","table.rs","visibility.rs"]},{"name":"types","files":["address_type.rs","array_dimensions.rs","array_type.rs","boolean_type.rs","char_type.rs","data_type.rs","field_type.rs","group_type.rs","integer_type.rs","mod.rs","signed_integer_type.rs","tuple_type.rs","type_.rs","unsigned_integer_type.rs"]},{"name":"values","files":["address.rs","address_typed.rs","address_value.rs","boolean_value.rs","char_types.rs","char_value.rs","field_value.rs","group_coordinate.rs","group_value.rs","integer_value.rs","mod.rs","negative_number.rs","number_value.rs","positive_number.rs","signed_integer_value.rs","unsigned_integer_value.rs","value.rs"]}],"files":["ast.rs","lib.rs"]};
sourcesIndex["leo_lang"] = {"name":"","dirs":[{"name":"commands","dirs":[{"name":"package","files":["add.rs","clone.rs","fetch.rs","login.rs","logout.rs","mod.rs","publish.rs","remove.rs"]}],"files":["build.rs","clean.rs","deploy.rs","init.rs","lint.rs","mod.rs","new.rs","prove.rs","run.rs","setup.rs","test.rs","update.rs","watch.rs"]}],"files":["api.rs","config.rs","context.rs","lib.rs","logger.rs","updater.rs"]};
sourcesIndex["leo_linter"] = {"name":"","files":["main.rs"]};
sourcesIndex["leo_package"] = {"name":"","dirs":[{"name":"imports","files":["directory.rs","mod.rs"]},{"name":"inputs","files":["directory.rs","input.rs","mod.rs","pairs.rs","state.rs"]},{"name":"outputs","files":["ast_snapshot.rs","checksum.rs","circuit.rs","directory.rs","mod.rs","proof.rs","proving_key.rs","verification_key.rs"]},{"name":"root","files":["gitignore.rs","lock_file.rs","manifest.rs","mod.rs","readme.rs","zip.rs"]},{"name":"source","files":["directory.rs","main.rs","mod.rs"]}],"files":["lib.rs","package.rs"]};
sourcesIndex["leo_parser"] = {"name":"","dirs":[{"name":"parser","files":["context.rs","expression.rs","file.rs","mod.rs","statement.rs","type_.rs"]},{"name":"tokenizer","files":["lexer.rs","mod.rs","token.rs"]}],"files":["lib.rs"]};
sourcesIndex["leo_state"] = {"name":"","dirs":[{"name":"local_data_commitment","files":["local_data_commitment.rs","mod.rs","state_leaf_values.rs","state_values.rs"]},{"name":"record_commitment","files":["dpc_record_values.rs","mod.rs","record_commitment.rs"]},{"name":"utilities","files":["input_value.rs","mod.rs"]}],"files":["lib.rs"]};
sourcesIndex["leo_synthesizer"] = {"name":"","files":["circuit_synthesizer.rs","lib.rs","serialized_circuit.rs","serialized_field.rs","serialized_index.rs","summarized_circuit.rs"]};
sourcesIndex["leo_test_framework"] = {"name":"","files":["error.rs","fetch.rs","lib.rs","output.rs","runner.rs","test.rs"]};
sourcesIndex["tgc"] = {"name":"","files":["tgc.rs"]};
createSourceSidebar();
