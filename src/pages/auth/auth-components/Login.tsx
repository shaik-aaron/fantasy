import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import api from '../../../api/posts'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthContext } from "@/context/AuthProvider"
import { useContext, useState } from "react"
import type { LoginDetails } from "@/types/auth"
import { Loader2 } from "lucide-react"

function Login() {

    let navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginDetails>()
    const onSubmit: SubmitHandler<LoginDetails> = async (data) => {
        console.log(data)
        try {
            setIsLoading(true)
            const response = await api.post('/login', data)
            console.log(response)
            if (response.status == 200) {
                setAuth({ userId: response.data.userId, firstName: response.data.firstName, email: response.data.email });
                setIsLoading(false)
                navigate('/home/lock-in')
            }
        }
        catch (err) {
            console.log("Error: ", err)
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full mt-2">
            <CardHeader>
                <CardTitle className="font-geist-semibold text-xl">Welcome back!</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-8">
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
                            <FieldLabel htmlFor="password" className="font-geist-bold">Password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                placeholder="password"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <FieldError>Password is required</FieldError>}
                        </Field>
                        <Field>
                            <Button type="submit" className="cursor-pointer font-geist-semibold" disabled={isLoading}>
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <p>Login</p>}
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <p className="font-geist-semibold mt-2 text-sm">Don't have an account? <Link className="underline" to='/auth/signup'>Sign up</Link> here!</p>
            </CardFooter>
        </Card>
    )
}

export default Login