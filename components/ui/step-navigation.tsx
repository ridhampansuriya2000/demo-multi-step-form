import React from 'react';
import {Button} from "@/components/ui/button";

interface StepNavigationProps {
    onNext?: () => void;
    onBack?: () => void;
    nextLabel?: string;
    backLabel?: string;
    isNextDisabled?: boolean;
    position?: 'left' | 'center' | 'right';
}

const getPositionClass = (position: StepNavigationProps['position']) => {
    switch (position) {
        case 'left':
            return 'justify-start';
        case 'center':
            return 'justify-center';
        case 'right':
        default:
            return 'justify-end';
    }
};

const StepNavigation = ({
                            onNext,
                            onBack,
                            nextLabel,
                            backLabel,
                            isNextDisabled = false,
                            position = 'right',
                        }: StepNavigationProps) => {
    return (
        <div className={`mt-8 flex space-x-4 ${getPositionClass(position)}`}>
            {backLabel && (
                <button
                    type="button"
                    onClick={onBack}
                    className="border border-gray-300 hover:bg-gray-50 px-8 py-2 rounded-sm w-40 text-sm"
                >
                    {backLabel}
                </button>
            )}
            {nextLabel && (
                <Button
                    type="button"
                    onClick={onNext}
                    disabled={isNextDisabled}
                    className={`px-8 py-2 rounded-sm w-40 text-sm text-white ${
                        isNextDisabled
                            // ? 'bg-gray-400 cursor-not-allowed'
                            ? 'bg-[#FF5C35] hover:bg-[#e04f2f]'
                            : 'bg-[#FF5C35] hover:bg-[#e04f2f]'
                    }`}
                >
                    {nextLabel}
                </Button>
            )}
        </div>
    );
};

export default StepNavigation;