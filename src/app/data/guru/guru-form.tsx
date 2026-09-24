"use client";

import { useActionState, useRef, useEffect } from "react";
import { createTeacherAction, type ActionResult } from "./actions";
import { Button } from "@/components/ui/button";

const initialState: ActionResult = { ok: false };

export function GuruForm() {
  const [state, formAction, pending] = useActionState(createTeacherAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs font-semibold text-foreground">
          Nama <span className="text-status-conflict">*</span>
        </label>
        <input
          id="name"
          name="name"
          required
          className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-(--shadow-inset-1) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Nama lengkap guru"
        />
      </div>

      <details className="text-sm">
        <summary className="cursor-pointer text-muted-foreground">
          Detail tambahan (opsional)
        </summary>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Field id="shortName" name="shortName" label="Nama Pendek" />
          <Field id="email" name="email" label="Email" type="email" />
          <Field id="phone" name="phone" label="Telepon" />
        </div>
      </details>

      {state.error && (
        <p className="text-sm text-status-conflict" role="alert">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Menyimpan…" : "Tambah Guru"}
      </Button>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-(--shadow-inset-1) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}
