"use client"
import { useState, useEffect } from "react"
import { Phone, Check, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"

// Mock data matching Cooee's actual countries and structure
const mockCountries = {
    Canada: {
        flag: "🇨🇦",
        numbers: [
            "+1-647-555-0123",
            "+1-647-555-0456",
            "+1-647-555-0789",
            "+1-647-555-1234",
            "+1-647-555-5678",
            "+1-647-555-9012",
            "+1-647-555-3456",
        ],
    },
    "United States": {
        flag: "🇺🇸",
        numbers: ["+1-555-0123", "+1-555-0456", "+1-555-0789", "+1-555-1234", "+1-555-5678", "+1-555-9012", "+1-555-3456"],
    },
    Australia: {
        flag: "🇦🇺",
        numbers: ["+61-2-5555-0123", "+61-2-5555-0456", "+61-2-5555-0789", "+61-2-5555-1234", "+61-2-5555-5678"],
    },
    Netherlands: {
        flag: "🇳🇱",
        numbers: ["+31-20-555-0123", "+31-20-555-0456", "+31-20-555-0789", "+31-20-555-1234", "+31-20-555-5678"],
    },
    "United Kingdom": {
        flag: "🇬🇧",
        numbers: ["+44-20-5555-0123", "+44-20-5555-0456", "+44-20-5555-0789", "+44-20-5555-1234", "+44-20-5555-5678"],
    },
}

const mockPlans = [
    {
        id: "basic",
        name: "Basic",
        price: 5,
        features: ["500 minutes/month", "Unlimited SMS", "Basic voicemail", "Mobile app access"],
    },
    {
        id: "premium",
        name: "Premium",
        price: 10,
        features: [
            "Unlimited minutes",
            "Unlimited SMS",
            "Advanced voicemail",
            "Mobile app access",
            "Call recording",
            "Number porting",
        ],
    },
    {
        id: "business",
        name: "Business",
        price: 20,
        features: [
            "Unlimited minutes",
            "Unlimited SMS",
            "Advanced voicemail",
            "Mobile app access",
            "Call recording",
            "Number porting",
            "Team management",
            "Analytics dashboard",
        ],
    },
]

const StepIndicator = ({ step, title, completed, active }) => (
    <div className="flex items-center space-x-3 mb-6">
        <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                completed
                    ? "bg-green-500 text-white"
                    : active
                        ? "bg-white text-gray-800 border-2 border-gray-300"
                        : "bg-gray-600 text-gray-400"
            }`}
        >
            {completed ? <Check size={16} /> : step}
        </div>
        <div>
            <p className="text-xs text-gray-400">Step {step}</p>
            <p className={`text-sm font-medium ${active ? "text-white" : "text-gray-400"}`}>{title}</p>
        </div>
    </div>
)

export default function CooeeSignupFlow() {
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState("Australia")
    const [selectedNumber, setSelectedNumber] = useState("")
    const [selectedPlan, setSelectedPlan] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
    })

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
    })



    const simulateApiCall = (duration = 1500) => {
        setLoading(true)
        return new Promise((resolve) => {
            setTimeout(() => {
                setLoading(false)
                resolve()
            }, duration)
        })
    }

    const handleCountrySelect = (country) => {
        setSelectedCountry(country)
        setSelectedNumber("")
    }

    const handleNumberSelect = async (number) => {
        setSelectedNumber(number)
        await simulateApiCall(800)
    }

    const handlePlanSelect = (planId) => {
        setSelectedPlan(planId)
    }

    const handleNext = async () => {
        if (currentStep < 5) {
            await simulateApiCall(1000)
            setCurrentStep((prev) => Math.min(prev + 1, 5))
        }
    }

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(1, prev - 1))
    }

    const handleUserDetailsChange = (field, value) => {
        setUserDetails((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handlePaymentDetailsChange = (field, value) => {
        setPaymentDetails((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return Boolean(selectedCountry && selectedNumber)
            case 2:
                return Boolean(selectedPlan)
            case 3:
                return Boolean(
                    userDetails.email &&
                    userDetails.password &&
                    userDetails.confirmPassword &&
                    userDetails.password === userDetails.confirmPassword,
                )
            case 4:
                return Boolean(
                    paymentDetails.cardNumber && paymentDetails.expiryDate && paymentDetails.cvv && paymentDetails.cardholderName,
                )
            default:
                return false
        }
    }

    const selectedPlanDetails = mockPlans.find((plan) => plan.id === selectedPlan)



    const CountryNumberSelection = () => (
        <div className="min-h-screen flex bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="w-80 flex-shrink-0 bg-gray-800 p-8 relative">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">cooee</h1>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-medium mb-2">Start your journey</h2>
                    <p className="text-gray-400 text-sm">in 4 easy steps</p>
                </div>

                <div className="space-y-4">
                    <StepIndicator step={1} title="Select country & number" completed={false} active={true} />
                    <StepIndicator step={2} title="Select a plan" completed={false} active={false} />
                    <StepIndicator step={3} title="Register your account" completed={false} active={false} />
                    <StepIndicator step={4} title="Make Payment" completed={false} active={false} />
                </div>

                <div className="absolute bottom-8 left-8">
                    <p className="text-xs text-gray-500">Made with 💚 in Australia</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-end mb-8">
                        <p className="text-gray-300">
                            Already registered? <span className="text-green-400 cursor-pointer">Login</span>
                        </p>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">Select a country</h1>
                        <p className="text-gray-400 text-lg">What country's mobile number do you want?</p>
                    </div>

                    {/* Country Dropdown */}
                    <div className="mb-8">
                        <div className="relative">
                            <select
                                value={selectedCountry}
                                onChange={(e) => handleCountrySelect(e.target.value)}
                                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white text-lg appearance-none cursor-pointer pr-12"
                            >
                                <option value="">I want a mobile number from...</option>
                                {Object.keys(mockCountries).map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Popular Countries */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-6">Popular countries</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            {Object.entries(mockCountries).map(([country, data]) => (
                                <button
                                    key={country}
                                    onClick={() => handleCountrySelect(country)}
                                    className={`p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-center ${
                                        selectedCountry === country ? "ring-2 ring-green-500" : ""
                                    }`}
                                >
                                    <div className="text-2xl mb-2">{data.flag}</div>
                                    <p className="text-sm text-gray-300">{country}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Available Numbers */}
                    {selectedCountry && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Available Numbers</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {mockCountries[selectedCountry].numbers.map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => handleNumberSelect(number)}
                                        className={`p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-left ${
                                            selectedNumber === number ? "ring-2 ring-green-500 bg-green-900/20" : ""
                                        }`}
                                    >
                                        <div className="font-mono text-white">{number}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Know More Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-6">Know more</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <div className="text-2xl font-bold text-green-400 mb-3">1</div>
                                <p className="text-gray-300">
                                    You can apply for multiple virtual mobile numbers with one account on Cooee after setting up your
                                    account.
                                </p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <div className="text-2xl font-bold text-green-400 mb-3">2</div>
                                <p className="text-gray-300">
                                    We're always expanding Cooee's reach. If your country isn't supported yet, we'll
                                    notify you as soon as it is.
                                </p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <div className="text-2xl font-bold text-green-400 mb-3">3</div>
                                <p className="text-gray-300">
                                    With Cooee, you can now port your number to a new service provider. This is subject to the regulations
                                    of your destination country.
                                </p>
                            </div>
                        </div>
                    </div>

                    {selectedNumber && (
                        <div className="flex justify-end">
                            <button
                                onClick={handleNext}
                                disabled={loading}
                                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={16} />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <span>Continue</span>
                                )}
                            </button>
                        </div>
                    )}

                    <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-700">
                        <p className="text-xs text-gray-500">Privacy policy</p>
                        <p className="text-xs text-gray-500">Terms of service</p>
                    </div>
                </div>
            </div>
        </div>
    )

    const PlanSelection = () => (
        <div className="min-h-screen flex bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="w-80 flex-shrink-0 bg-gray-800 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">cooee</h1>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-medium mb-2">Start your journey</h2>
                    <p className="text-gray-400 text-sm">in 4 easy steps</p>
                </div>

                <div className="space-y-4">
                    <StepIndicator step={1} title="Select country & number" completed={true} active={false} />
                    <StepIndicator step={2} title="Select a plan" completed={false} active={true} />
                    <StepIndicator step={3} title="Register your account" completed={false} active={false} />
                    <StepIndicator step={4} title="Make Payment" completed={false} active={false} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <button onClick={handleBack} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                            <ArrowLeft className="text-white" size={24} />
                        </button>
                        <p className="text-gray-300">
                            Already registered? <span className="text-green-400 cursor-pointer">Login</span>
                        </p>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
                        <p className="text-gray-400 text-lg">
                            Selected number: <span className="text-white font-mono">{selectedNumber}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {mockPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                    selectedPlan === plan.id
                                        ? "border-green-500 bg-green-900/20"
                                        : "border-gray-600 hover:border-gray-500"
                                } bg-gray-800`}
                                onClick={() => handlePlanSelect(plan.id)}
                            >
                                {plan.id === "premium" && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">Most Popular</span>
                                    </div>
                                )}

                                <div className="text-center mb-4">
                                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                    <div className="text-3xl font-bold text-green-400 mt-2">
                                        ${plan.price}
                                        <span className="text-base text-gray-400">/month</span>
                                    </div>
                                </div>

                                <ul className="space-y-2">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center space-x-2">
                                            <Check size={16} className="text-green-500 flex-shrink-0" />
                                            <span className="text-sm text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {selectedPlan === plan.id && (
                                    <div className="absolute top-4 right-4">
                                        <Check size={20} className="text-green-500" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {selectedPlan && (
                        <div className="flex justify-end">
                            <button
                                onClick={handleNext}
                                disabled={loading}
                                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-medium"
                            >
                                {loading ? "Processing..." : "Continue"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    const UserRegistration = () => (
        <div className="min-h-screen flex bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="w-80 flex-shrink-0 bg-gray-800 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">cooee</h1>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-medium mb-2">Start your journey</h2>
                    <p className="text-gray-400 text-sm">in 4 easy steps</p>
                </div>

                <div className="space-y-4">
                    <StepIndicator step={1} title="Select country & number" completed={true} active={false} />
                    <StepIndicator step={2} title="Select a plan" completed={true} active={false} />
                    <StepIndicator step={3} title="Register your account" completed={false} active={true} />
                    <StepIndicator step={4} title="Make Payment" completed={false} active={false} />
                </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 min-w-0 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <button
                            onClick={handleBack}
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="text-white" size={24} />
                        </button>
                        <p className="text-gray-300">
                            Already registered?{" "}
                            <span className="text-green-400 cursor-pointer">Login</span>
                        </p>
                    </div>

                    <div className="mb-6 text-center">
                        <h1 className="text-4xl font-bold mb-2">You're so close!</h1>
                        <p className="text-gray-400">
                            Your preferences have been saved. Please register to make the payment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* OAuth Buttons */}
                        <div>
                            <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-4 flex items-center justify-center space-x-3 mb-4 transition-colors">
                                <img
                                    src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                                    alt="Google logo"
                                    className="w-5 h-5"
                                />
                                <span>Continue with Google</span>
                            </button>

                            <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg p-4 flex items-center justify-center space-x-3 mb-6 transition-colors">
                                <img
                                    src="https://cdn.brandfetch.io/idnrCPuv87/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"
                                    alt="Apple logo"
                                    className="w-5 h-5"
                                />
                                <span>Continue with Apple</span>
                            </button>

                            <div className="text-center mb-6">
                                <span className="text-gray-400 bg-gray-900 px-4">OR</span>
                            </div>

                            <div className="text-center text-xs text-gray-400">
                                By continuing to register, you agree to Cooee's{" "}
                                <span className="text-green-400 cursor-pointer">
            Terms and Conditions
          </span>{" "}
                                and{" "}
                                <span className="text-green-400 cursor-pointer">Privacy Policy</span>.
                            </div>
                        </div>

                        {/* Registration Form */}
                        <div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={userDetails.email || ""}
                                        onChange={(e) =>
                                            handleUserDetailsChange("email", e.target.value)
                                        }
                                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Create password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={userDetails.password || ""}
                                            onChange={(e) =>
                                                handleUserDetailsChange("password", e.target.value)
                                            }
                                            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                                            placeholder="Create password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={userDetails.confirmPassword || ""}
                                            onChange={(e) =>
                                                handleUserDetailsChange("confirmPassword", e.target.value)
                                            }
                                            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                                            placeholder="Confirm Password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {userDetails.password &&
                                    userDetails.confirmPassword &&
                                    userDetails.password !== userDetails.confirmPassword && (
                                        <p className="text-red-400 text-sm">Passwords do not match</p>
                                    )}

                                <button
                                    onClick={handleNext}
                                    disabled={!canProceed() || loading}
                                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors duration-200 font-medium"
                                >
                                    {loading ? "Processing..." : "Continue"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )

    const PaymentForm = () => (
        <div className="min-h-screen flex bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="w-80 flex-shrink-0 bg-gray-800 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">cooee</h1>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-medium mb-2">Start your journey</h2>
                    <p className="text-gray-400 text-sm">in 4 easy steps</p>
                </div>

                <div className="space-y-4">
                    <StepIndicator step={1} title="Select country & number" completed={true} active={false} />
                    <StepIndicator step={2} title="Select a plan" completed={true} active={false} />
                    <StepIndicator step={3} title="Register your account" completed={true} active={false} />
                    <StepIndicator step={4} title="Make Payment" completed={false} active={true} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 overflow-y-auto">
                <div className="max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <button onClick={handleBack} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                            <ArrowLeft className="text-white" size={24} />
                        </button>
                        <p className="text-gray-300">
                            Already registered? <span className="text-green-400 cursor-pointer">Login</span>
                        </p>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">Payment Information</h1>
                        <p className="text-gray-400">Complete your order to activate your virtual number</p>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-white">Order Summary</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Virtual Number</span>
                                <span className="font-mono text-white">{selectedNumber}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">{selectedPlanDetails?.name} Plan</span>
                                <span className="text-white">${selectedPlanDetails?.price}/month</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Setup Fee</span>
                                <span className="text-white">$0</span>
                            </div>
                            <hr className="border-gray-600" />
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span className="text-white">Total (Monthly)</span>
                                <span className="text-green-400">${selectedPlanDetails?.price}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-6 text-white">Payment Details</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-300 mb-2">Cardholder Name</label>
                                <input
                                    type="text"
                                    value={paymentDetails.cardholderName}
                                    onChange={(e) => handlePaymentDetailsChange("cardholderName", e.target.value)}
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Kavya R"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-300 mb-2">Card Number</label>
                                <input
                                    type="text"
                                    value={paymentDetails.cardNumber}
                                    onChange={(e) =>
                                        handlePaymentDetailsChange(
                                            "cardNumber",
                                            e.target.value
                                                .replace(/\s/g, "")
                                                .replace(/(.{4})/g, "$1 ")
                                                .trim(),
                                        )
                                    }
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    maxLength={19}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">Expiry Date</label>
                                    <input
                                        type="text"
                                        value={paymentDetails.expiryDate}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, "")
                                            if (value.length >= 2) {
                                                value = value.substring(0, 2) + "/" + value.substring(2, 4)
                                            }
                                            handlePaymentDetailsChange("expiryDate", value)
                                        }}
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">CVV</label>
                                    <input
                                        type="text"
                                        value={paymentDetails.cvv}
                                        onChange={(e) => handlePaymentDetailsChange("cvv", e.target.value.replace(/\D/g, ""))}
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="123"
                                        maxLength={4}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={!canProceed() || loading}
                            className="w-full mt-8 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-colors duration-200 font-semibold text-lg"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Processing Payment...</span>
                                </div>
                            ) : (
                                `Complete Order - ${selectedPlanDetails?.price}/month`
                            )}
                        </button>

                        <div className="text-center mt-4">
                            <p className="text-xs text-gray-400">Your payment is secured with 256-bit SSL encryption</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const Confirmation = () => (
        <div className="min-h-screen flex bg-gray-900 text-white">
            {/* Sidebar */}
            <div className="w-80 flex-shrink-0 bg-gray-800 p-8 relative">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">cooee</h1>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-medium mb-2">Start your journey</h2>
                    <p className="text-gray-400 text-sm">in 4 easy steps</p>
                </div>

                <div className="space-y-4">
                    <StepIndicator step={1} title="Select country & number" completed={true} active={false} />
                    <StepIndicator step={2} title="Select a plan" completed={true} active={false} />
                    <StepIndicator step={3} title="Register your account" completed={true} active={false} />
                    <StepIndicator step={4} title="Make Payment" completed={true} active={false} />
                </div>

                <div className="absolute bottom-8 left-8">
                    <p className="text-xs text-gray-500">Made with 💚 in Australia</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 overflow-y-auto flex items-center justify-center">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Success Animation */}
                    <div className="relative mb-8">
                        <div className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                                <Check size={40} className="text-white" />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-5xl font-bold mb-6 text-white">Welcome to Cooee! 🎉</h1>

                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        Congratulations! Your virtual number is now active and ready to use. You can start making calls and sending
                        messages immediately.
                    </p>

                    {/* Account Details Card */}
                    <div className="bg-gray-800 border border-gray-600 rounded-xl p-8 mb-8 text-left">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Your Account Details</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Virtual Number</p>
                                    <p className="text-xl font-mono font-bold text-green-400">{selectedNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Country</p>
                                    <p className="text-lg font-semibold text-white">{selectedCountry}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Plan</p>
                                    <p className="text-lg font-semibold text-white">{selectedPlanDetails?.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Monthly Cost</p>
                                    <p className="text-xl font-bold text-green-400">${selectedPlanDetails?.price}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-600">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Account Email</p>
                                <p className="text-lg text-white">{userDetails.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-teal-900/30 border border-teal-600 rounded-xl p-6 mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-teal-200">What's Next?</h3>
                        <div className="text-left space-y-3 text-teal-100">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-white">1</span>
                                </div>
                                <p>Check your email for account setup instructions and app download links</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-white">2</span>
                                </div>
                                <p>Download the Cooee mobile app to start using your virtual number</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-white">3</span>
                                </div>
                                <p>Your first billing cycle starts today - you can manage your subscription anytime</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-semibold text-lg">
                            Access Dashboard
                        </button>
                        <button className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-semibold">
                            Download App
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-400">
                            Need help? Contact our support team at{" "}
                            <span className="text-green-400 cursor-pointer hover:underline">support@cooee.com</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <CountryNumberSelection />
            case 2:
                return <PlanSelection />
            case 3:
                return <UserRegistration />
            case 4:
                return <PaymentForm />
            case 5:
                return <Confirmation />
            default:
                return <CountryNumberSelection />
        }
    }

    return <div className="font-sans">{renderCurrentStep()}</div>
}