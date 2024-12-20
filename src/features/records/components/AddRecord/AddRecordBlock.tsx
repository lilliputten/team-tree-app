'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/shared/icons';

import { TRecordWithChildrenOrCount } from '../../types';

// import { maxNameLength, minNameLength } from '../constants/inputFields';

export interface TAddRecordFormData {
  name: TRecordWithChildrenOrCount['name'];
}

export interface TAddRecordBlockProps {
  onSubmit: (formData: TAddRecordFormData) => Promise<unknown>;
  onCancel?: () => void;
  className?: string;
  isPending?: boolean;
}

export function AddRecordBlock(props: TAddRecordBlockProps) {
  const {
    // prettier-ignore
    className,
    onSubmit,
    onCancel,
    isPending,
  } = props;

  const formSchema = React.useMemo(
    () =>
      z.object({
        name: z.string(), // .min(minNameLength).max(maxNameLength),
      }),
    [],
  );

  const defaultValues: TAddRecordFormData = React.useMemo(() => {
    return {
      name: '',
    };
  }, []);

  // @see https://react-hook-form.com/docs/useform
  const form = useForm<TAddRecordFormData>({
    // @see https://react-hook-form.com/docs/useform
    mode: 'onChange', // 'all', // Validation strategy before submitting behaviour.
    criteriaMode: 'all', // Display all validation errors or one at a time.
    resolver: zodResolver(formSchema),
    defaultValues, // Default values for the form.
  });
  const {
    // @see https://react-hook-form.com/docs/useform
    formState, // FormState<TFieldValues>;
    handleSubmit, // UseFormHandleSubmit<TFieldValues, TTransformedValues>;
    // register, // UseFormRegister<TFieldValues>;
    reset, // UseFormReset<TFieldValues>;
    setFocus,
  } = form;

  // Focus the first field (should it be used with a languages list?)
  React.useEffect(() => setFocus('name'), [setFocus]);

  const {
    // @see https://react-hook-form.com/docs/useform/formstate
    isDirty, // boolean;
    // errors, // FieldErrors<TFieldValues>;
    isValid, // boolean;
  } = formState;

  const isSubmitEnabled = !isPending && isDirty && isValid;

  const doSubmit = (formData: TAddRecordFormData) => {
    onSubmit(formData).then(() => {
      reset();
    });
  };

  const doCancel = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(doSubmit)}
        className={cn(
          className,
          '__AddRecordBlock',
          'flex w-full flex-1 flex-col gap-4',
          // isPending && 'pointer-events-none opacity-50',
          'relative',
          'size-full',
          'overflow-hidden',
        )}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2">
              <FormControl>
                <Input
                  type="text"
                  className="flex-1"
                  placeholder="Name"
                  {...field}
                  onChange={(ev) => field.onChange(ev)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col justify-between"></div>
        {/* Actions */}
        <div className="flex w-full gap-4">
          <Button
            type="submit"
            variant={isSubmitEnabled ? 'default' : 'disable'}
            disabled={!isSubmitEnabled}
          >
            {isPending ? <Icons.spinner className="size-4 animate-spin" /> : <span>Create</span>}
          </Button>
          <Button variant="ghost" onClick={doCancel}>
            <span>Cancel</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
