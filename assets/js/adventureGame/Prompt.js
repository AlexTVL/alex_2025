const Prompt = {
    isOpen: false,
    dim: false,
    currentNpc: null,

    backgroundDim: {
        create() {
            this.dim = true; // sets the dim to be true when the prompt is opened
            console.log("CREATE DIM");
            const dimDiv = document.createElement("div");
            dimDiv.id = "dim";
            dimDiv.style.backgroundColor = "black";
            dimDiv.style.width = "100%";
            dimDiv.style.height = "100%";
            dimDiv.style.position = "absolute";
            dimDiv.style.opacity = "0.8";
            document.body.append(dimDiv);
            dimDiv.style.zIndex = "9998";
            dimDiv.addEventListener("click", Prompt.backgroundDim.remove);
        },
        remove() {
            this.dim = false;
            console.log("REMOVE DIM");
            const dimDiv = document.getElementById("dim");
            dimDiv.remove();
            Prompt.isOpen = false;
            const promptDropDown = document.querySelector('.promptDropDown');
            if (this.isOpen) {
                promptDropDown.style.width = "70%";
                promptDropDown.style.top = "15%";
                promptDropDown.style.left = "15%";
            } else {
                promptDropDown.style.width = "0px";
                promptDropDown.style.top = "0px";
                promptDropDown.style.left = "0px";
            }
        },
    },

    createPromptDisplayTable() {
        const table = document.createElement("table");
        table.className = "table prompt";

        // Header row for questions
        const header = document.createElement("tr");
        const th = document.createElement("th");
        th.colSpan = 2;
        th.innerText = "Answer the Questions Below:";
        header.appendChild(th);
        table.appendChild(header);

        return table;
    },

    toggleDetails() {
        Prompt.detailed = !Prompt.detailed;
        Prompt.updatePromptDisplay();
    },

    updatePromptTable() {
        const table = this.createPromptDisplayTable();
        // Use `currentNpc` to populate questions
        if (this.currentNpc && this.currentNpc.questions) {
            this.currentNpc.questions.forEach((question, index) => {
                const row = document.createElement("tr");
                // Question cell
                const questionCell = document.createElement("td");
                questionCell.innerText = `${index + 1}. ${question}`;
                questionCell.style.color = '#333'; // Make the text darker
                row.appendChild(questionCell);
                // Input cell
                const inputCell = document.createElement("td");
                const input = document.createElement("input");
                input.type = "text";
                input.placeholder = "Your answer here...";
                input.dataset.questionIndex = index; // Tag input with the question index
                inputCell.appendChild(input);
                row.appendChild(inputCell);
                table.appendChild(row);
            });
            // Add submit button
            const submitRow = document.createElement("tr");
            const submitCell = document.createElement("td");
            submitCell.colSpan = 2;
            submitCell.style.textAlign = "center";
            const submitButton = document.createElement("button");
            submitButton.innerText = "Submit";
            submitButton.addEventListener("click", this.handleSubmit.bind(this)); // Attach submission handler
            submitCell.appendChild(submitButton);
            submitRow.appendChild(submitCell);
            table.appendChild(submitRow);
        } else {
            const row = document.createElement("tr");
            const noQuestionsCell = document.createElement("td");
            noQuestionsCell.colSpan = 2;
            noQuestionsCell.innerText = "No questions available.";
            row.appendChild(noQuestionsCell);
            table.appendChild(row);
        }
        // Wrap the table in a scrollable container
        const container = document.createElement("div");
        container.style.maxHeight = "400px"; // Limit height for scrollability
        container.style.overflowY = "auto"; // Enable vertical scrolling
        container.style.border = "1px solid #ccc"; // Optional: add a border
        container.style.padding = "10px"; // Optional: add some padding
        container.appendChild(table);
        return container;
    },

    handleSubmit() {
        // Collect all answers
        const inputs = document.querySelectorAll("input[type='text']");
        const answers = Array.from(inputs).map(input => ({
            questionIndex: input.dataset.questionIndex,
            answer: input.value.trim()
        }));
        console.log("Submitted Answers:", answers);
        // Handle the submission logic (e.g., save answers, validate, etc.)
        alert("Your answers have been submitted!");
        Prompt.isOpen = false;
        Prompt.backgroundDim.remove();
    },

    updatePromptDisplay() {
        const table = document.getElementsByClassName("table scores")[0];
        const detailToggleSection = document.getElementById("detail-toggle-section");
        const clearButtonRow = document.getElementById("clear-button-row");
        const pagingButtonsRow = document.getElementById("paging-buttons-row");

        if (detailToggleSection) {
            detailToggleSection.remove();
        }

        if (table) {
            table.remove(); //remove old table if it is there
        }

        if (pagingButtonsRow) {
            pagingButtonsRow.remove();
        }

        if (clearButtonRow) {
            clearButtonRow.remove();
        }

        document.getElementById("promptDropDown").append(Prompt.updatePromptTable()); //update new Prompt
    },

    backPage() {
        const table = document.getElementsByClassName("table scores")[0];

        if (Prompt.currentPage - 1 == 0) {
            return;
        }

        Prompt.currentPage -= 1;
        Prompt.updatePromptDisplay();
    },

    frontPage() {
        Prompt.currentPage += 1;
        Prompt.updatePromptDisplay();
    },

    openPromptPanel(content, callback) {
        const promptDropDown = document.querySelector('.promptDropDown');
        const promptTitle = document.getElementById("promptTitle");

        promptTitle.innerHTML = content;

        // Toggle `isOpen` state
        this.isOpen = true;

        // Handle the prompt drop-down visibility
        if (this.isOpen) {
            Prompt.backgroundDim.create();

            // Remove old table if it exists
            const table = document.getElementsByClassName("table scores")[0];
            if (table) {
                table.remove();
            }

            // Update the prompt display with questions
            Prompt.updatePromptDisplay();

            // Style the prompt drop-down
            promptDropDown.style.position = "fixed";
            promptDropDown.style.zIndex = "9999";
            promptDropDown.style.width = "70%";
            promptDropDown.style.top = "15%";
            promptDropDown.style.left = "15%";
            promptDropDown.style.transition = "all 0.3s ease-in-out";

            // Call the callback function after the prompt is closed
            if (callback) {
                callback();
            }
        }
    },

    showCustomPrompt(message, top = '50%', left = '50%') {
        let customAlert = document.getElementById("custom-alert");
        let customAlertMessage = document.getElementById("custom-alert-message");

        // Create the custom alert elements if they do not exist
        if (!customAlert) {
            customAlert = document.createElement("div");
            customAlert.id = "custom-alert";
            customAlert.style.position = "fixed";
            customAlert.style.top = top;
            customAlert.style.left = left;
            customAlert.style.transform = "translate(-50%, -50%)";
            customAlert.style.backgroundColor = "white";
            customAlert.style.padding = "20px";
            customAlert.style.border = "1px solid black";
            customAlert.style.zIndex = "10000";
            customAlert.style.display = "none";

            customAlertMessage = document.createElement("div");
            customAlertMessage.id = "custom-alert-message";
            customAlert.appendChild(customAlertMessage);

            document.body.appendChild(customAlert);
        }

        customAlertMessage.innerText = message;
        customAlert.style.display = "block";
        setTimeout(() => {
            customAlert.style.display = "none";
        }, 3000); // Display for 3 seconds
    },

    closeCustomPrompt() {
        const customAlert = document.getElementById("custom-alert");
        if (customAlert) {
            customAlert.style.display = "none";
        }
    },

    showDialogueOptions(options, callback) {
        let customPrompt = document.getElementById("custom-prompt");
        let customPromptMessage = document.getElementById("custom-prompt-message");
        let customPromptInput = document.getElementById("custom-prompt-input");
        let customPromptSubmit = document.getElementById("custom-prompt-submit");

        // Create the custom prompt elements if they do not exist
        if (!customPrompt) {
            customPrompt = document.createElement("div");
            customPrompt.id = "custom-prompt";
            customPrompt.style.position = "fixed";
            customPrompt.style.top = "50%";
            customPrompt.style.left = "50%";
            customPrompt.style.transform = "translate(-50%, -50%)";
            customPrompt.style.backgroundColor = "white";
            customPrompt.style.padding = "20px";
            customPrompt.style.border = "1px solid black";
            customPrompt.style.zIndex = "10000";
            customPrompt.style.display = "none";

            customPromptMessage = document.createElement("div");
            customPromptMessage.id = "custom-prompt-message";
            customPrompt.appendChild(customPromptMessage);

            customPromptInput = document.createElement("input");
            customPromptInput.id = "custom-prompt-input";
            customPromptInput.type = "number";
            customPromptInput.min = "1";
            customPromptInput.max = "4";
            customPrompt.appendChild(customPromptInput);

            customPromptSubmit = document.createElement("button");
            customPromptSubmit.id = "custom-prompt-submit";
            customPromptSubmit.innerText = "Submit";
            customPrompt.appendChild(customPromptSubmit);

            document.body.appendChild(customPrompt);
        }

        customPromptMessage.innerHTML = options.map((option, index) => `<p>${index + 1}. ${option}</p>`).join("");
        customPrompt.style.display = "block";

        customPromptSubmit.onclick = () => {
            const choice = parseInt(customPromptInput.value, 10);
            if (choice >= 1 && choice <= 4) {
                customPrompt.style.display = "none";
                callback(choice);
            } else {
                alert("Please enter a number between 1 and 4.");
            }
        };
    },

    initializePrompt() {
        const promptTitle = document.createElement("div");
        promptTitle.id = "promptTitle";
        document.getElementById("promptDropDown").appendChild(promptTitle);
        // document.getElementById("promptDropDown").append(this.updatePromptTable())

        // document.getElementById("prompt-button").addEventListener("click",Prompt.openPromptPanel)
    },

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};

export default Prompt;