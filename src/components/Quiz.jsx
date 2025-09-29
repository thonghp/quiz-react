import React, { useEffect, useState } from "react";
import Results from "./Results";

const quizData = [
    {
        question: "Biến nào sau đây là hợp lệ trong JavaScript?",
        options: ["1variable", "_variable", "var-name", "var name"],
        answer: "_variable",
    },
    {
        question:
            "Trong JavaScript, kiểu dữ liệu nào sau đây là kiểu dữ liệu nguyên thủy (primitive)?",
        options: ["object", "array", "string", "function"],
        answer: "string",
    },
    {
        question:
            "Thuật toán sắp xếp nào sau đây có độ phức tạp trung bình là O(n log n)?",
        options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Linear Sort"],
        answer: "Merge Sort",
    },
    {
        question: "Kết quả của `typeof null` trong JavaScript là gì?",
        options: ["'null'", "'undefined'", "'object'", "'number'"],
        answer: "'object'",
    }
];

const Quiz2 = () => {
    const [optionSelected, setOptionSelected] = useState("")
    const [userAnswers, setUserAnswers] = useState(Array.from({ length: quizData.length }))
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [isQuizEnded, setIsQuizEnded] = useState(false)
    const [score, setScore] = useState(0)

    const handleSelectedOption = (option, index) => {
        if (option === quizData[currentQuestion].answer) {
            setScore((prev) => prev + 1)
        }

        setOptionSelected(option)
        const newUserAnswers = [...userAnswers]
        newUserAnswers[currentQuestion] = index
        setUserAnswers(newUserAnswers)
    }

    const goNext = () => {
        if (currentQuestion === quizData.length - 1) {
            setIsQuizEnded(true)
        } else {
            setCurrentQuestion((prev) => prev + 1)
        }
    }

    const goBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1)
        }
    }

    const restartQuiz = () => {
        setCurrentQuestion(0)
        setIsQuizEnded(false)
        setOptionSelected("")
        setScore(0)
        setUserAnswers(Array.from({ length: quizData.length }))
    }

    const rewatchQuiz = () => {
        setCurrentQuestion(0);
        setIsQuizEnded(false);
    };

    useEffect(() => {
        const answer = userAnswers[currentQuestion]
        if (answer === undefined) {
            setOptionSelected("")
        } else {
            setOptionSelected(quizData[currentQuestion].options[answer])
        }
    }, [currentQuestion, userAnswers])


    if (isQuizEnded) {
        return (
            <Results
                score={score}
                totalQuestionNum={quizData.length}
                restartQuiz={restartQuiz}
                rewatchQuiz={rewatchQuiz}
            />
        );
    }

    return (
        <div>
            <h2>Câu {currentQuestion + 1}</h2>
            <p className="question">{quizData[currentQuestion].question}</p>
            {quizData[currentQuestion].options.map((option, index) => (
                <button key={option} className={`option ${optionSelected === option ? "selected" : ""}`} onClick={() => handleSelectedOption(option, index)}>{option}</button>
            ))}
            {
                optionSelected !== "" && (optionSelected === quizData[currentQuestion].answer ?
                    (<p className="correct-answer">Chính xác</p>) :
                    (<p className="incorrect-answer">Sai</p>))
            }
            <div className="nav-buttons">
                <button onClick={goBack} disabled={currentQuestion === 0}>Quay lại</button>
                <button onClick={goNext} disabled={!optionSelected}>
                    {currentQuestion === quizData.length - 1 ? "Ket thuc" : "Tiep tuc"}
                </button>
            </div>
        </div >
    )
}

export default Quiz2;