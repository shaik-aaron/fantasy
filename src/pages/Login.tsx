import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"

function Login() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-4">
                    <div className="w-10 border"></div>
                    <h1 className="font-lust text-4xl font-bold">FANTASY</h1>
                    <div className="w-10 border"></div>
                </div>
                <p className="font-geist-semibold mt-2">Don't have an account? <Link className="underline" to='/signup'>Sign up</Link> here!</p>
                <div className="w-full mt-6">
                    <FieldGroup className="gap-8">
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="email" className="font-geist-bold">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </Field>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="password" className="font-geist-bold">Password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                placeholder="password"
                                required
                            />
                        </Field>
                        <Field>
                            <Button type="submit" className="cursor-pointer font-geist-bold">Login</Button>
                        </Field>
                    </FieldGroup>
                </div>
            </div>
        </div>
    )
}

export default Login