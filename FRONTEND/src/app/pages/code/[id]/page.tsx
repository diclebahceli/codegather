"use client";
import React from "react";
import AceEditorComponent from "@/app/components/ace_editor/AceEditor";
import { GetQuestionById } from "@/app/services/QuestionService";

export default async function EditorPage({params}: {params: {id: number}}) {
    var question = await GetQuestionById(params.id);
    function onValueChange(value: string) {
        console.log(value);
    }
    return (
        <div>
            <h1>Ace Editor Example</h1>
            <AceEditorComponent onValueChange={onValueChange} />
        </div>
    );
}