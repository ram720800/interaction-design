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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState, useEffect } from "react";
import { useCompletion } from "@ai-sdk/react";
import SkeletonAnimation from "./SkeletonAnimation";

const formSchema = z.object({
  projectName: z.string().min(1, { message: "Project title is missing." }),
  projectURL: z.string().min(1, { message: "Project URL is required." }),
  tagline: z
    .string()
    .min(1, { message: "Please add a meaningful tagline for this project." }),
  category: z.string().optional(),
  builtWith: z.string().optional(),
  collaborators: z.number().optional(),
  autofillUrl: z.string().url().optional(),
});

const categories = [
  { id: 1, name: "AI" },
  { id: 2, name: "Crypto" },
  { id: 3, name: "Dev" },
  { id: 4, name: "Figma" },
  { id: 5, name: "Art" },
];

const completionItems: {
  id: keyof z.infer<typeof formSchema>;
  label: string;
}[] = [
  { id: "projectName", label: "Project name" },
  { id: "projectURL", label: "Project URL" },
  { id: "tagline", label: "Tagline" },
  { id: "category", label: "Category" },
  { id: "builtWith", label: "Built with" },
  { id: "collaborators", label: "Collaborators" },
];

const loadingTexts = [
  "Analyzing project URL...",
  "Extracting key information...",
  "Populating project details...",
  "Finalizing autofill...",
];

const AutofillWithAi = () => {
  const [isShowingLoader, setIsShowingLoader] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectURL: "",
      tagline: "",
      category: "",
      builtWith: "",
      collaborators: 0,
      autofillUrl: "",
    },
  });

  const { complete, isLoading } = useCompletion({
    api: "/api/suggest-messages",
    onFinish: (prompt, completion) => {
      try {
        const jsonMatch = completion.match(/```json\n([\s\S]+)\n```/);
        const jsonString = jsonMatch ? jsonMatch[1].trim() : completion;
        const data = JSON.parse(jsonString);

        if (data.projectName) {
          form.setValue("projectName", data.projectName);
        }
        if (data.projectURL) {
          form.setValue("projectURL", data.projectURL);
        }
        if (data.tagline) {
          form.setValue("tagline", data.tagline);
        }
        if (data.category) {
          form.setValue("category", data.category);
        }
      } catch (error) {
        console.error("Error parsing completion:", error);
      }
      setTimeout(() => {
        setIsShowingLoader(false);
      }, 6000);
    },
  });

  const formValues = form.watch();

  const completionPercentage = useMemo(() => {
    const completedFields = completionItems.filter((item) => {
      const value = formValues[item.id];
      if (typeof value === "number") return value > 0;
      if (typeof value === "string") return value.trim() !== "";
      return !!value;
    }).length;
    return Math.round((completedFields / completionItems.length) * 100);
  }, [formValues]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleAutofill = () => {
    setIsShowingLoader(true);
    const url = form.getValues("autofillUrl");
    if (url) {
      const prompt = `Based on the content of the website at ${url}, suggest a project name, project URL, tagline, and category. Return the response as a JSON object with keys: "projectName", "projectURL", "tagline", "category". Make sure the JSON is valid.`;
      complete(prompt);
    }
  };

  const TextLoader = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
      }, 1500);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="text-center py-8">
        <p className="text-lg font-semibold text-foreground/40">
          {loadingTexts[index]}
        </p>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8 font-geist">
      <div className="lg:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative overflow-hidden rounded-2xl bg-radial-[at_20%_2%] from-foreground/30 to-gray4/20 to-75% p-4">
              {isShowingLoader && (
                <>
                  <span className="animate-width-pulse absolute inset-x-0 top-px mr-12 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-success to-transparent"></span>
                  <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-success to-transparent h-[5px] w-full mx-auto blur-md"></span>
                </>
              )}
              <h2 className="text-md font-semibold">
                Autofill details with AI
              </h2>
              <p className="text-gray4 mb-4 text-sm">
                Simply input your project URL, and we'll automagically fill in
                the details for you!
              </p>
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="autofillUrl"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={handleAutofill}
                  disabled={isLoading}
                  className="bg-foreground text-background rounded-2xl hover:bg-foreground/90 transition-colors cursor-pointer"
                >
                  {isLoading ? "Autofilling..." : "Autofill"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the project URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tagline</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the tagline" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="builtWith"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Built with</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Next.js, Tailwind CSS, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="collaborators"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collaborators</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="text-background bg-foreground rounded-2xl"
              >
                Save Project
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="lg:col-span-1">
        <div>
          {isShowingLoader ? (
            <div className="px-6 py-1 bg-background border border-[#3a3a3a] rounded-3xl sticky top-6 translate-all duration-300">
              <div className="flex items-center justify-between my-4 gap-4">
                <div className="flex space-x-1">
                  <div className="size-3.5 rounded-full bg-[#FF605C]/60"></div>
                  <div className="size-3.5 rounded-full bg-[#FFBD44]/60"></div>
                  <div className="size-3.5 rounded-full bg-[#00CA4E]/60"></div>
                </div>
                {formValues.autofillUrl && (
                  <p className="text-center text-sm text-gray4 truncate">
                    {formValues.autofillUrl}
                  </p>
                )}
              </div>
              <SkeletonAnimation />
              <TextLoader />
            </div>
          ) : (
            <div className="bg-radial-[at_10%_2%] from-red-400/40 to-black to-85% px-6 py-12 border border-[#3a3a3a] rounded-3xl sticky top-6 translate-all duration-300">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-red-400 mb-2">
                  {completionPercentage}%
                </div>
                <h3 className="text-md font-semibold mb-2">
                  Project Completion
                </h3>
                <p className="text-sm text-gray4">
                  Complete 100% of your project details to make it eligible for
                  launching on Peerlist Launchpad.
                </p>
              </div>

              <div className="space-y-4">
                {completionItems.map((item) => {
                  const value = formValues[item.id];
                  const isCompleted =
                    (typeof value === "string" && value.trim() !== "") ||
                    (typeof value === "number" && value > 0);

                  return (
                    <div key={item.id} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isCompleted
                            ? "bg-success border-success"
                            : "border-foreground"
                        }`}
                      >
                        {isCompleted && (
                          <svg
                            className="w-3 h-3 text-foreground"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          isCompleted ? "text-gray4" : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AutofillWithAi;
