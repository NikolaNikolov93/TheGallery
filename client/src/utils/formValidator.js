export default function formValidator(inputValues) {
    const validationResult = {
        isValid: true,
        errorMessage: "",
    };

    for (const key in inputValues) {
        switch (key) {
            case "username":
                const username = inputValues[key].trim();
                if (username === "") {
                    validationResult.isValid = false;
                    validationResult.errorMessage =
                        "Username field cannot be empty!";
                } else if (username.length < 4) {
                    validationResult.isValid = false;
                    validationResult.errorMessage = `Username must have atleast 4 symbols`;
                }

                break;
            case "headline":
                const headline = inputValues[key].trim();
                if (headline === "") {
                    validationResult.isValid = false;
                    validationResult.errorMessage =
                        "Headline field cannot be empty!";
                } else if (headline.length < 3) {
                    validationResult.isValid = false;
                    validationResult.errorMessage = `Headline should contain atleast 3 symbols!`;
                }

                break;
            case "description":
                const description = inputValues[key].trim();
                if (description === "") {
                    validationResult.isValid = false;
                    validationResult.errorMessage =
                        "Description field cannot be empty!";
                } else if (description.length < 10) {
                    validationResult.isValid = false;
                    validationResult.errorMessage = `Desciption should contain atleast 10 symbols!`;
                } else if (description.length > 500) {
                    validationResult.isValid = false;
                    validationResult.errorMessage = `Description can be maximum 150 charactes`;
                }

                break;
            case "url":
                const url = inputValues[key].trim();
                if (url === "") {
                    validationResult.isValid = false;
                    validationResult.errorMessage =
                        "Url field cannot be empty!";
                }
                break;
            case "email":
                const email = inputValues[key].trim();
                const emialRegex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (email === "") {
                    validationResult.isValid = false;
                    validationResult.errorMessage =
                        "Email field cannot be empty!";
                }
                if (!emialRegex.test(email)) {
                    validationResult.isValid = false;
                    validationResult.errorMessage =
                        "Please, type correct email!";
                }
                break;
            case "password":
                const password = inputValues[key].trim();
                if (password === "") {
                    validationResult.isValid = false;
                    validationResult.errorMessage =
                        "Password field cannot be empty!";
                }
                if (password.length < 5 && password != "") {
                    validationResult.isValid = false;
                    validationResult.errorMessage =
                        "Password must contain atleast 5 charactes!";
                }
                break;

            default:
                break;
        }
    }
    return validationResult;
}
