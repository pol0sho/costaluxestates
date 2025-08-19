"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Phone } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(10),
  contactMethod: z.enum(["email", "phone", "whatsapp"]),
});

type ContactFormProps = {
  dict: any; // translations
  propertyRef?: string;
  propertyTitle?: string;
};

export function ContactForm({ dict, propertyRef, propertyTitle }: ContactFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: propertyRef
        ? `${dict.contactForm.subject} ${propertyRef}`
        : "",
      message: "",
      contactMethod: "email",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          propertyRef,
          propertyTitle,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");

      toast({
        title: dict.contactForm.toastSuccessTitle,
        description: dict.contactForm.toastSuccessDescription,
      });

      form.reset();
    } catch (err) {
      toast({
        title: dict.contactForm.toastErrorTitle,
        description: dict.contactForm.toastErrorDescription,
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="shadow-lg border-none h-full">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{dict.form.title}</CardTitle>
        <CardDescription>{dict.form.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dict.form.name}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{dict.form.email}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.form.phone}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input {...field} className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{dict.form.contactMethod}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="email" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {dict.form.contactOptions.email}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="phone" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {dict.form.contactOptions.phone}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="whatsapp" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {dict.form.contactOptions.whatsapp}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.contactForm.subject}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={dict.contactForm.subjectPlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.contactForm.message}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={dict.contactForm.messagePlaceholder}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full text-base font-bold bg-primary hover:bg-primary/90"
            >
              {dict.form.button}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
