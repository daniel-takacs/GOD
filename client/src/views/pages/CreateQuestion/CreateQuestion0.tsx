import * as React from 'react';

export interface IAppProps {
}

function CreateQuestion0(props: IAppProps) {
    return (
        <div>
            <div className="wrapper">
                <h1>Create a Discuussion</h1>
                <p>Asking the right question is an important aspect of a healthy discussion for ultimately agreeing, as a group on the right solution. </p>
                <div className="question">
                    But how do you ask the “right question”?
                </div>
                <div className="instruction__box">
                    <div className="instruction__number">1</div>
                    <div className="instructions__text">When creating a question and describing your concern, please be civil. Remember there are human beings with feelings on the other side. </div>
                </div>
                <div className="warnings--text">
                    Once a discussion is shared, it cannot be edited.
                </div>
            </div>

        </div>
    );
}

export default CreateQuestion0;
