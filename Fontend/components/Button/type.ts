export interface IButtonProps {
    disabled?: boolean;
    title: string;
    variant: 'contained' | 'outlined' | 'text';
    className?: any;
    type: 'submit' | 'reset' | 'button';
}