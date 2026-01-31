import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router";
import api from '../../../api/posts'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { SignUpDetails } from "@/types/auth"
import { AuthContext } from "@/context/AuthProvider"
import { useContext } from "react"

function Signup() {

    let navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpDetails>()
    const onSubmit: SubmitHandler<SignUpDetails> = async (data) => {
        console.log("Request data: ", data)
        try {
            const response = await api.post('/signup', data)
            console.log(response)
            if (response.status == 201) {
                setAuth({ userId: response.data.userId, firstName: response.data.firstName, email: response.data.email });
                navigate("/home")
            }
        }
        catch (err) {
            console.log(`Error: ${err}`)
        }
    }

    return (
        <Card className="w-full mt-2">
            <CardHeader>
                <CardTitle className="font-geist-semibold text-xl">Hello! Ready to focus?</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-8">
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="first-name" className="font-geist-bold">First Name</FieldLabel>
                            <Input
                                id="first-name"
                                type="first-name"
                                placeholder="John"
                                {...register("firstName", { required: true })}
                            />
                            {errors.firstName && <FieldError>First name is required</FieldError>}
                        </Field>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="last-name" className="font-geist-bold">Last Name</FieldLabel>
                            <Input
                                id="last-name"
                                type="last-name"
                                placeholder="Doe"
                                {...register("lastName", { required: true })}
                            />
                            {errors.lastName && <FieldError>Last name is required</FieldError>}
                        </Field>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="email" className="font-geist-bold">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <FieldError>Email is required</FieldError>}
                        </Field>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="password" className="font-geist-bold">Set a password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                placeholder="password"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <FieldError>Password is required</FieldError>}
                        </Field>
                        <Field>
                            <Button type="submit" className="cursor-pointer font-geist-bold">Sign up!</Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <p className="font-geist-semibold mt-2 text-sm">Already have an account? <Link className="underline" to="/auth/login">Log in</Link> here!</p>
            </CardFooter>
        </Card>
    )
}

export default Signup