import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { useAuthSignInEmail } from "@/auth/hooks/useAuthSignInEmail";
import { Form } from "@/components/_form/Form";
import { TextField } from "@/components/_rhf/Text";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card/Card";
import { Link } from "@/components/Link";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";
import { AuthWithGoogle } from "@/pages/Auth/AuthGoogle/AuthWithGoogle";

import { EmailOtp } from "../../AuthOtp/EmailOtp";

const signInSchema = z.object({
  email: z.string().email(),
});

type SignInSchemaForm = z.infer<typeof signInSchema>;

export const SignInWithEmail = () => {
  const { t } = useTranslation("sign-up");

  const [emailResponse, setEmailResponse] = useState<{
    code: number;
    codeHash: string;
    email: string;
  } | null>(null);

  const { isPending, mutateAsync } = useAuthSignInEmail();

  const form = useForm<SignInSchemaForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (formData: SignInSchemaForm) => {
    try {
      const response = await mutateAsync(formData.email);
      setEmailResponse({
        code: response.data.code,
        codeHash: response.data.code_hash,
        email: formData.email,
      });
    } catch (error) {
      // console.log(error);
    }
  };

  if (emailResponse) {
    return <EmailOtp {...emailResponse} />;
  }

  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-full max-w-[400px] flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-6">
          <Card className="h-12 w-12 bg-white shadow-lg">
            <img src="/logo.png" alt="logo" />
          </Card>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-heading-5">{t("title")}</h1>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
            <div className="flex flex-col items-center gap-6 bg-transparent py-8">
              <div className="flex w-full max-w-[400px] flex-col gap-5">
                <TextField
                  name="email"
                  label={t("emailLabel")}
                  placeholder={t("emailPlaceholder")}
                />
              </div>

              <div className="flex w-full flex-col items-center gap-3">
                <LoadingButton
                  type="submit"
                  isLoading={isPending}
                  variant="primary"
                  size="lg"
                  className="w-full text-md"
                >
                  {t("signUpButtonTitle")}
                </LoadingButton>
                <AuthWithGoogle />
              </div>
            </div>
          </form>
        </Form>
        <div className="flex flex-row items-center gap-1">
          <p className="text-center text-sm text-gray">{t("footerTitle")} </p>
          <Button variant="primary-link" size="link" asChild>
            <Link to="/auth/sign-in">{t("urlTitle")}</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};
