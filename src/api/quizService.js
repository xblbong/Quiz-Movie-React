export const fetchMovieQuestions = async (signal) => {
  const URL = "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple";
  
  const response = await fetch(URL, { signal });
  if (!response.ok) throw new Error("Gagal mengambil data kuis");
  
  const data = await response.json();
  
  // Transformasi data: Shuffle jawaban agar posisi jawaban benar acak
  return data.results.map((item) => {
    const options = [...item.incorrect_answers, item.correct_answer].sort(
      () => Math.random() - 0.5
    );
    return {
      question: item.question,
      correctAnswer: item.correct_answer,
      options,
    };
  });
};