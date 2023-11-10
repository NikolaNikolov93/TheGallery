import styles from "./Register.module.css";
export default function Register() {
    return (
        <div>
            <h2>Registration Form</h2>
            <form>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value="{formData.firstName}"
                    />
                </label>
                <br />

                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value="{formData.lastName}"
                    />
                </label>
                <br />

                <label>
                    Email:
                    <input type="email" name="email" value="{formData.email}" />
                </label>
                <br />

                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value="{formData.password}"
                    />
                </label>
                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}
