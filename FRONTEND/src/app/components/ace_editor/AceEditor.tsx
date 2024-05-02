"use client";
import React, {useState} from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/theme-twilight';
import "ace-builds/src-noconflict/theme-monokai"
import {Ace} from "ace-builds";


function AceEditorComponent({onValueChange}: {onValueChange: (value: string) => void}) {
  const [value , setValue] = useState<string>("");
  function onChange(newValue: string) {
    onValueChange(newValue);
    setValue(newValue);
  }
  function onLoad(editor: Ace.Editor) {
    console.log("i've loaded");
  }
  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode="javascript"
      theme="monokai"
      name="blah2"
      onLoad={onLoad}
      onChange={onChange}
      fontSize={15}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      style={{borderRadius: "5px", height: "100%"}}
      width="100%"
      value={value}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }} />


  );
}

export default AceEditorComponent;
