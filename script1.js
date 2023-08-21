// Replace this with your actual OpenAI API key
const apiKey = "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";

// Function to perform code generation using GPT-3
function generateResponse(promptText) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: promptText,
      max_tokens: 150,
      engine: "text-davinci-003",
    }),
  };

  return fetch(`https://api.openai.com/v1/engines/text-davinci-003/completions`, requestOptions)
    .then(response => response.json())
    .then(data => data.choices[0].text.trim())
    .catch(error => {
      console.error(error);
      return "An error occurred while generating the response.";
    });
}

// Function to handle button clicks
function handleButtonClick(event) {
  const buttonId = event.target.id;
  const inputCode = document.querySelector(".input-output textarea").value;

  const promptText = (() => {
    switch (buttonId) {
      case "convertButton":
        return `Convert the following Python code to C++:\n\n${inputCode}\n\nC++ code:`;
      case "debugButton":
        return `Debug and fix the following code:\n\n${inputCode}\n\nFixed code:`;
      case "formatButton":
        return `Format the following code:\n\n${inputCode}\n\nFormatted code:`;
      case "explainButton":
        return `Explain the following code in detail:\n\n${inputCode}\n\nExplanation:`;
      case "completeButton":
        return `Complete the following code:\n\n${inputCode}\n\nCompleted code:`;
      default:
        return "";
    }
  })();

  generateResponse(promptText)
    .then(response => {
      document.querySelector(".output-box").textContent = response;
    });
}

// Add event listeners to buttons
document.getElementById("convertButton").addEventListener("click", handleButtonClick);
document.getElementById("debugButton").addEventListener("click", handleButtonClick);
document.getElementById("formatButton").addEventListener("click", handleButtonClick);
document.getElementById("explainButton").addEventListener("click", handleButtonClick);
document.getElementById("completeButton").addEventListener("click", handleButtonClick);
