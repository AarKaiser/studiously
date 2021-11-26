import React from 'react'
import Qus from './Qus.json';
import { Container, CardColumns, Card, Button } from 'react-bootstrap';


function Questions(props) {
    return (
        <>
        <Container>

                    <h2>{Qus[0].question}</h2>
                    {Qus[0].answers.map(answer => {
                        return (
                            <div>
                                <h2>{Qus[0].answers[0].answerText}</h2>
                                <h2>{Qus[0].answers[1].answerText}</h2>
                            
                        </div>
                        )
                    }
                    )
                }
            </Container>
            <br />

            <Container>

<h2>{Qus[1].question}</h2>
{Qus[1].answers.map(answer => {
    return (
        <div>        
        <h2>{Qus[1].answers[0].answerText}</h2>
        <h2>{Qus[1].answers[1].answerText}</h2>
    </div>
    )
}
)
}
</Container>
<br />
<Container>

<h2>{Qus[2].question}</h2>
{Qus[2].answers.map(answer => {
    return (
        <div>        
        <h2>{Qus[2].answers[0].answerText}</h2>
        <h2>{Qus[2].answers[1].answerText}</h2>
    </div>
    )
}
)
}
</Container>






        </>

    )
}

export default Questions;