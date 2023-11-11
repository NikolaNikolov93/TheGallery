import styles from "./Register.module.css";
export default function Register() {
    return (
        <div className={styles.formContainer}>
            <h2>Registration Form</h2>
            <form>
                <label className={styles.label}>
                    First Name:
                    <input
                        className={styles.input}
                        type="text"
                        name="firstName"
                        value="{formData.firstName}"
                    />
                </label>
                <br />

                <label className={styles.label}>
                    Last Name:
                    <input
                        className={styles.input}
                        type="text"
                        name="lastName"
                        value="{formData.lastName}"
                    />
                </label>
                <br />

                <label className={styles.label}>
                    Email:
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        value="{formData.email}"
                    />
                </label>
                <br />

                <label className={styles.label}>
                    Password:
                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        value="{formData.password}"
                    />
                </label>
                <br />

                <button className={styles.submitButton} type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}
