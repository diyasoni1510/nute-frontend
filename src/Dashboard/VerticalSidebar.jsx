import React from 'react'
import "./Kyc.css"
const stepNames = [
    'Contact Information',
    'Business PAN',
    'Business Owner PAN',
    'Business Details',
    'Business Registration Details',
    'Bank Account Details',
    'Website Details',
    'Business Owner Details',
    'Details of Beneficial Ownership',
    
  ];
  
const VerticalSidebar =  ({ totalSteps, currentStep }) =>{
    const renderSteps = () => {
        const steps = [];
        for (let i = 1; i <= totalSteps; i++) {
          steps.push(
            <div key={i} className={`step ${currentStep === i ? 'active' : ''}`}>
              <div className={`step_div ${currentStep === i ? 'active' : ''}`}>
                {stepNames[i - 1]}
              </div>
            </div>
          );
        }
        return steps;
      };
  return (
    <> 
    <div className="wizard">
        <div className="v-line"></div>
        {renderSteps()}
      </div>
    </>
  )
}

export default VerticalSidebar