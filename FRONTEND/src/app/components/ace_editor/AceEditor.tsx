import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { Ace } from "ace-builds";


function AceEditorComponent({ onValueChange }: { onValueChange: (value: string) => void }) {
    function onChange(newValue: string) {
        onValueChange(newValue);
    }
    function onLoad(editor: Ace.Editor) {
        console.log("i've loaded");
    }
    return (
        <AceEditor
            placeholder="Placeholder Text"
            mode="javascript"
            theme="solarized_dark"
            name="blah2"
            onLoad={onLoad}
            onChange={onChange}
            fontSize={18}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            style={{ borderRadius: "5px", height: "100%"}}
            width="100%"
            value={`function onLoad(editor) {
  console.log("i've loaded");
}`}
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
