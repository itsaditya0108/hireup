import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import useFetch from "@/hooks/use-fetch"
import { BarLoader } from "react-spinners"
import { useEffect, useState } from "react"
import { addNewCompany } from "@/api/apiCompanies"

const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    logo: z
        .any()
        .refine(
            file => file[0] && (file[0].type === "image/png" || file[0].type === "image/jpeg"),
            { message: "Only PNG or JPEG images are allowed" }
        ),
})

const AddCompanyDrawer = ({ fetchCompany }) => {
    const [isOpen, setIsOpen] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    })

    const {
        loading: loadingAddCompany,
        error: errorAddCompany,
        data: dataAddCompany,
        fn: fnAddCompany,
    } = useFetch(addNewCompany)

    const onSubmit = (data) => {
        fnAddCompany({
            name: data.name,
            logo: data.logo[0],
        })
    }

    useEffect(() => {
        if (dataAddCompany?.length > 0) {
            fetchCompany()
            reset()
            setIsOpen(false) // Auto-close drawer
        }
    }, [dataAddCompany])

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button type="button" size="sm" variant="secondary">
                    Add Company
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add a New Company</DrawerTitle>
                </DrawerHeader>

                {/* FORM */}
                <form
                    className="
      flex flex-col sm:flex-row 
      gap-3 p-4 pb-0
      w-full
    "
                >
                    {/* Company Name */}
                    <Input
                        placeholder="Company name"
                        {...register("name")}
                        className="w-full sm:w-auto flex-1"
                    />

                    {/* Logo Upload */}
                    <Input
                        type="file"
                        accept="image/*"
                        {...register("logo")}
                        className="w-full sm:w-auto flex-1 file:text-gray-500"
                    />

                    {/* Add Button */}
                    <Button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        variant="destructive"
                        className="w-full sm:w-40"
                    >
                        Add
                    </Button>
                </form>

                {/* FOOTER */}
                <DrawerFooter>
                    {/* Validation Errors */}
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
                    {errorAddCompany?.message && (
                        <p className="text-red-500">{errorAddCompany.message}</p>
                    )}

                    {/* Loader */}
                    {loadingAddCompany && <BarLoader width="100%" color="#36d7b7" />}

                    {/* Cancel Button */}
                    <DrawerClose asChild>
                        <Button type="button" variant="secondary" className="w-full sm:w-auto">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>

        </Drawer>
    )
}

export default AddCompanyDrawer
