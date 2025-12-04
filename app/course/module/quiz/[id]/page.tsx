"use client";
import { useState } from "react";
import {
  useGetQuizQuery,
  useSubmitQuizMutation,
} from "@/app/redux/api/call/courseApi";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, AlertCircle } from "lucide-react";
import { message } from "antd";

export default function Page() {
  const { id } = useParams();
  const route = useRouter();
  const { data, isLoading } = useGetQuizQuery({ id });
  const [answers, setAnswers] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [submitQuiz, { isLoading: submitLoading }] = useSubmitQuizMutation();
  const quizData = data?.data || [];
  const handleOptionSelect = (questionId: string, option: any) => {
    setAnswers((prev: any) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unansweredCount = quizData.length - Object.keys(answers).length;
    if (unansweredCount > 0) {
      return message.warning(
        `Please answer all questions. ${unansweredCount} question(s) remaining.`
      );
    }

    setIsSubmitting(true);

    try {
      // Format data for submission
      const submissionData = quizData?.map((question: any) => ({
        _id: question._id,
        answer: answers[question._id],
      }));

      console.log("Submission Data:", submissionData);

      // Submit quiz
      const sendQuiz = await submitQuiz({
        id,
        answers: submissionData,
      }).unwrap();
      if (sendQuiz?.success) {
        setQuizResult(sendQuiz?.data);
        setIsSubmitted(true);
      } else {
        message.error(sendQuiz?.message || "Failed to submit quiz");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      message.error("An error occurred while submitting the quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-4" />
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-4" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((j) => (
                  <div
                    key={j}
                    className="h-12 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="pt-10 flex items-center justify-center">
        <div className="bg-white border border-gray-50 rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Your answers have been submitted successfully. Good luck!
          </p>

          {quizResult && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total Marks:</span>
                <span className="text-lg font-bold text-gray-900">
                  {quizResult?.totalMarks}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Earned Marks:</span>
                <span className="text-lg font-bold text-green-600">
                  {quizResult?.earnedMarks}
                </span>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Correct Answers:
                </span>
                <span className="text-lg font-bold text-green-600">
                  {quizResult?.correctAnswers}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Incorrect Answers:
                </span>
                <span className="text-lg font-bold text-red-600">
                  {quizResult?.incorrectAnswers}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => route.push("/dashboard")}
            className="px-6 py-2 bg-red-600 text-white rounded-full cursor-pointer hover:bg-red-800 transition-colors"
          >
            Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Module Quiz
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Total Questions: {quizData.length}</span>
            <span>•</span>
            <span>
              Answered: {Object.keys(answers).length}/{quizData.length}
            </span>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6 mb-6">
          {quizData.map((question: any, index: number) => {
            const options = [
              { key: "A", value: question.optionA },
              { key: "B", value: question.optionB },
              { key: "C", value: question.optionC },
              { key: "D", value: question.optionD },
            ];

            const selectedAnswer = answers[question._id];

            return (
              <div
                key={question._id}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                {/* Question Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="shrink-0 w-8 h-8 bg-red-100 text-green-700 rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {question.question}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                      {question.mark} marks
                    </span>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3 ml-11">
                  {options.map((option) => (
                    <button
                      key={option.key}
                      onClick={() =>
                        handleOptionSelect(question._id, option.key)
                      }
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswer === option.key
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            selectedAnswer === option.key
                              ? "border-green-500 bg-green-500"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedAnswer === option.key && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="font-medium text-gray-700 mr-2">
                          {option.key}.
                        </span>
                        <span className="text-gray-900">{option.value}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-lg shadow-sm p-6 sticky bottom-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              {Object.keys(answers).length === quizData.length ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">All questions answered</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">
                    {quizData.length - Object.keys(answers).length} question(s)
                    remaining
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full sm:w-auto cursor-pointer px-8 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Quiz</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
