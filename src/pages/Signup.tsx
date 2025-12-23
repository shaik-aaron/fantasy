import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"

function Signup() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-4">
                    <div className="w-10 border"></div>
                    <h1 className="font-lust text-4xl font-bold">FANTASY</h1>
                    <div className="w-10 border"></div>
                </div>
                <p className="font-geist-semibold mt-2">Hello and Welcome!</p>
                <p className="font-geist-semibold">Already have an account? <Link className="underline" to="/login">Log in</Link> here!</p>
                <div className="w-full mt-6">
                    <FieldGroup className="gap-8">
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="first-name" className="font-geist-bold">First Name</FieldLabel>
                            <Input
                                id="first-name"
                                type="first-name"
                                placeholder="John"
                                required
                            />
                        </Field>
                        <Field className="flex flex-col gap-1">
                            <FieldLabel htmlFor="last-name" className="font-geist-bold">Last Name</FieldLabel>
                            <Input
                                id="last-name"
                                type="last-name"
                                placeholder="Doe"
                                required
                            />
                        </Field>
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
                            <FieldLabel htmlFor="password" className="font-geist-bold">Set a password</FieldLabel>
                            <Input
                                id="password"
                                type="password"
                                placeholder="password"
                                required
                            />
                        </Field>
                        <Field>
                            <Button type="submit" className="cursor-pointer font-geist-bold">Sign up!</Button>
                        </Field>
                    </FieldGroup>
                </div>
            </div>
        </div>
    )
}

export default Signup