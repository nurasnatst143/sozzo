import React from 'react';
import InfoWrapper from '@/components/posts/InfoWrapper';

const page = () => {
  return (
    <InfoWrapper>
      <div className="min-h-[80vh] flex justify-center items-center">
        <div className="max-w-[500px] px-5 py-8 bg-gray-700 rounded-md">
          <p className="text-xl font-semibold text-center">
            We’ve sent a confirmation email to your inbox. Please check your
            email and click the link to complete your registration. This will
            ensure you have full access to all our features.
          </p>
          <p className="pt-6">
            "If you don't see the confirmation email in your inbox, please check
            your spam or junk folder. Sometimes emails can end up there by
            mistake."
          </p>
        </div>
      </div>
    </InfoWrapper>
  );
};

export default page;
