"use client";

import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Bem Vindo!"
      description="Entre em sua conta"
      isOpen={isOpen}
      onChange={onChange}>
      <Auth
        supabaseClient={supabaseClient}
        localization={{
          variables: {
            sign_in: {
              email_label: "Digite seu Email",
              email_input_placeholder: "Email",
              password_label: "Digite sua Senha",
              password_input_placeholder: "Senha",
              button_label: "Entrar",
              loading_button_label: "Entrando...",
              social_provider_text: "Entrar com {{provider}}",
              link_text: "Não possui uma conta? Registre-se",
            },
            sign_up: {
              email_label: "Digite seu Email",
              email_input_placeholder: "Email",
              password_label: "Digite sua Senha",
              password_input_placeholder: "Senha",
              button_label: "Entrar",
              loading_button_label: "Registrando...",
              social_provider_text: "Entrar com {{provider}}",
              link_text: "Já possui uma conta? Entre",
            },
            forgotten_password: {
              link_text: "Esqueceu sua senha?",
              email_label: "Email",
              password_label: "Sua Senha",
              email_input_placeholder: "Digite seu email",
              button_label: "Enviar Link",
              confirmation_text: "Confira seu email",
              loading_button_label: "Enviando o link...",
            },
            update_password: {
              password_label: "Nova Senha",
              password_input_placeholder: "Digite sua nova senha",
              button_label: "Alterar Senha",
              loading_button_label: "Alterando a senha...",
              confirmation_text: "Sua senha foi alterada",
            },
            magic_link: {
              email_input_label: "Email",
              email_input_placeholder: "Digite seu email",
              button_label: "Enviar Link Mágico",
              loading_button_label: "Enviando...",
              confirmation_text: "Verifique seu email",
              link_text: "Enviar Link Mágico",
            },
          },
        }}
        providers={["github"]}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#F40D0D",
              },
            },
          },
        }}
        theme="dark"
      />
    </Modal>
  );
};

export default AuthModal;
