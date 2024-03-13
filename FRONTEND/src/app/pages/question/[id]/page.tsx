"use client";
import React from "react";
import AceEditorComponent from "@/app/components/ace_editor/AceEditor";
import { GetQuestionById } from "@/app/services/QuestionService";
import Card from "@/app/components/card/Card";

export default async function EditorPage({ params }: { params: { id: number } }) {
    var question = await GetQuestionById(params.id);
    function onValueChange(value: string) {
        console.log(value);
    }
    return (
        <div className="bg-dark p-3" style={{height: "92vh"}}>
            <div className="d-flex flex-row h-100 justify-content-evenly">
                <div id="explanation" className="col-6 p-3">
                    <Card>
                        <div className="h-100 m-3 d-flex flex-column">
                            <h1 className="fs-1 text-white mb-5">{question.name}</h1>
                            <div>
                                <p className="text-white lh-lg">{question.description}</p>
                            </div>

                        </div>
                    </Card>

                </div>
                <div className="p-3 pe-0 ps-0 col-6 d-flex flex-column">
                    <div style={{ height: "35em" }}>
                        <AceEditorComponent onValueChange={onValueChange} />
                    </div>
                    <div className="flex-grow-1 mt-2">
                        <Card>
                            <div className="d-flex flex-row justify-content-between align-items-center p-5 pt-2 pe-4">
                                <div className="text-white fs-4 ">Results</div>
                                <div className="d-flex flex-row justify-content-end">
                                    <button className="btn btn-dark fs-5 me-3">Run</button>
                                    <button className="btn btn-green fs-5">Submit</button>

                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </div>

    );
}