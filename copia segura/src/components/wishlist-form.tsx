'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  location: z.string().min(3, "Please specify desired locations."),
  propertyType: z.string(),
  minBedrooms: z.coerce.number().min(0),
  minBathrooms: z.coerce.number().min(0),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  features: z.array(z.string()).optional(),
});

const features = [
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'sea_view', label: 'Sea View' },
    { id: 'garden', label: 'Private Garden' },
    { id: 'gated', label: 'Gated Community' },
    { id: 'garage', label: 'Garage/Parking' },
    { id: 'modern', label: 'Modern Design' },
]

export function WishlistForm() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            location: "",
            propertyType: "any",
            minBedrooms: 0,
            minBathrooms: 0,
            features: [],
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Wishlist Submitted!",
            description: "Thank you! We will notify you when a property matching your criteria becomes available.",
        });
        form.reset();
    }

    return (
        <Card className="max-w-3xl mx-auto shadow-lg border-none">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Define Your Dream Property</CardTitle>
                <CardDescription>
                    Tell us what you're looking for, and we'll help you find it.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                         <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="location" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preferred Locations</FormLabel>
                                <FormControl><Input placeholder="e.g., Marbella, Estepona, Benahavís" {...field} /></FormControl>
                                <FormDescription>You can list multiple towns or areas, separated by commas.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <div className="grid md:grid-cols-3 gap-6">
                            <FormField control={form.control} name="propertyType" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Any Type" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="any">Any Type</SelectItem>
                                            <SelectItem value="villa">Villa</SelectItem>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="townhouse">Townhouse</SelectItem>
                                            <SelectItem value="penthouse">Penthouse</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="minBedrooms" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Min. Bedrooms</FormLabel>
                                    <FormControl><Input type="number" placeholder="Any" {...field} /></FormControl>
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="minBathrooms" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Min. Bathrooms</FormLabel>
                                    <FormControl><Input type="number" placeholder="Any" {...field} /></FormControl>
                                </FormItem>
                            )} />
                        </div>
                        <div>
                            <FormLabel>Price Range (€)</FormLabel>
                            <div className="grid md:grid-cols-2 gap-6 mt-2">
                                <FormField control={form.control} name="minPrice" render={({ field }) => (
                                    <FormItem>
                                        <FormControl><Input type="number" placeholder="Minimum Price" {...field} /></FormControl>
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="maxPrice" render={({ field }) => (
                                    <FormItem>
                                        <FormControl><Input type="number" placeholder="Maximum Price" {...field} /></FormControl>
                                    </FormItem>
                                )} />
                            </div>
                        </div>
                         <FormField
                            control={form.control}
                            name="features"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Desired Features</FormLabel>
                                        <FormDescription>Select any features that are important to you.</FormDescription>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-4">
                                    {features.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="features"
                                            render={({ field }) => {
                                                return (
                                                <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(item.id)}
                                                            onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...(field.value || []), item.id])
                                                                : field.onChange(field.value?.filter((value) => value !== item.id));
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">{item.label}</FormLabel>
                                                </FormItem>
                                                );
                                            }}
                                        />
                                     ))}
                                     </div>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full text-base font-bold bg-primary hover:bg-primary/90">Submit Wishlist</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
