export default function formValidator(inputValues) {
    const validationResult = {
        isValid: true,
        errorMessage: "",
    };

    for (const key in inputValues) {
        switch (key) {
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
                if (email === "") {
                    validationResult.isValid = false;
                    validationResult.errorMessage =
                        "Email field cannot be empty!";
                }
                break;
            case "password":
                const passwordRegex = /^(?=.*\d).+/;
                const password = inputValues[key].trim();
                if (password === "") {
                    validationResult.isValid = false;
                    validationResult.errorMessage =
                        "Password field cannot be empty!";
                }
                if (!passwordRegex.test(password)) {
                    validationResult.isValid = false;
                    validationResult.errorMessage =
                        "Password must contain atleast one number!";
                }
                break;

            default:
                break;
        }
    }
    return validationResult;
}
