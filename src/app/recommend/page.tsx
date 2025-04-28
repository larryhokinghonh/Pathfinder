'use client'
import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar'
import FramedScreen from '@/components/FramedScreen/FramedScreen';
import PageTransitionEffect from '@/components/PageTransitionEffect/PageTransitionEffect';

export default function RecommendPage() {
    const [generatedRecommendation, setGeneratedRecommendation] = useState(null);
    const [formData, setFormData] = useState({
        grades: '',
        educationLevel: '',
        country: '',
        mbti: '',
        annualHouseholdIncome: '',
        extracurricular: '',
        company: '',
        jobRole: '',
        course: ''
    });

    async function fetchProfileData() {
        try {
            const res = await fetch('/api/users/profile');

            if (res.ok) {
                return res.json();
            }
        } catch (err) {
            console.error('Failed to fetch profile data: ', err);
        }
    }   

    // Handle user input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        // Cancels event if it's cancelable, default action belonging to event will not occur
        // Prevents form to be submitted when form input is not validated 
        e.preventDefault();

        const userBio = await fetchProfileData();

        const prompt = `Please provide detailed, structured career advisory and recommendations based on the student's profile:

        Student's Bio:
        - ${userBio.bio}

        Academic Background:
        - ${formData.grades}
        - Current Education Level: ${formData.educationLevel}
        - Preferred Country: ${formData.country}
        
        Personal Profile:
        - Extracurricular Activities: ${formData.extracurricular}
        - MBTI Personality Type: ${formData.mbti}
        - Financial Background: ${formData.annualHouseholdIncome}
        
        Career Interests:
        - Course Preference: ${formData.course}
        - Dream Company: ${formData.company}
        - Dream Job Role: ${formData.jobRole}

        IMPORTANT INSTRUCTIONS:
        1. For high school/A-levels/STPM students with letter grades:
           - Consider A*/A as excellent, B as good, C as average
           - Focus on subject combinations and strengths
           - Suggest suitable university courses based on subject grades
        2. For diploma/undergraduate/postgraduate students with GPA:
           - Consider GPA ranges (3.5-4.0 as excellent, 3.0-3.49 as good, etc.)
           - Focus on academic achievements and research potential
           - Suggest advanced study options or career paths

        IMPORTANT: Include relevant URL links in your response:
        1. For university recommendations, include official university website URLs
        2. For course recommendations, include direct links to program pages
        3. For career paths, include industry association websites or career guides
        4. For financial advice, include links to scholarship portals or financial aid resources

        Please provide comprehensive advice covering:
        1. Academic recommendations (suitable universities and courses), linking strengths and weaknesses of the user's MBTI personality to the recommended career path.
        2. Career path suggestions that align with their personal background and interests
        3. Scholarship and financial aid opportunities
        4. Steps to achieve their career goals, considering their unique circumstances
        5. Expected salary ranges in their region
        
        Format the response in pure JSON format. DO NOT stringify the object or wrap it in quotes. DO NOT wrap the output in markdown. Format the response with the following structure:
        {
            "academicAdvice": "Detailed academic recommendations, including top universities and program strengths. Include admission difficulty levels, key subjects to focus on, and industry relevance.",
            "universities": ["List of at least 3 universities in ${formData.country}, ranked based on relevance to the student's preferred major and career path."],
            "courses": ["List of 3-5 recommended degree programs from those universities, including their career prospects, specialization tracks, and industry demand."],
            "careerPath": "Step-by-step career roadmap, outlining short-term (1-2 years), medium-term (3-5 years), and long-term (5+ years) goals. Include internship recommendations, networking strategies, and in-demand certifications.",
            "financialAdvice": "Detailed breakdown of financial aid options, including merit-based scholarships, need-based grants, tuition fee subsidies, work-study programs, and loan options.",
            "salaryInsights": {
                "entryLevel": "Entry-level salary range",
                "midCareer": "Mid-career salary range",
                "senior": "Senior-level salary range",
                "notes": "Additional context about salary progression"
            }
        }`

        const result = await fetch('/api/gpt/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ prompt: prompt })
        })

        const recommendation = await result.json();

        if (recommendation) {
            setGeneratedRecommendation(recommendation);
        }
    }

    const renderRecommendation = (data: any) => {
        if (!data) return null;
        console.log(data)

        return (
            <div className="bg-white text-black mt-4 p-6 rounded-2xl">
                <div className="px-2">
                    <p className="text-2xl">Academic Advice</p>
                    <p className="text-lg">{data.result.academicAdvice}</p>
                </div>

                <div className="mt-2 px-2">
                    <p className="text-2xl">Universities</p>
                    <ul>
                        {data.result.universities?.map((uni: string, index: number) => (
                            <li key={index}><p className="text-lg">{uni}</p></li>
                        ))}
                    </ul>
                </div>

                <div className="mt-2 px-2">
                    <p className="text-2xl">Courses</p>
                    <ul>
                        {data.result.courses?.map((course: string, index: number) => (
                            <li key={index}><p className="text-lg">{course}</p></li>
                        ))}
                    </ul>
                </div>

                <div className="mt-2 px-2">
                    <p className="text-2xl">Career Path</p>
                    <p className="text-lg">{data.result.careerPath}</p>
                </div>

                <div className="mt-2 px-2">
                    <p className="text-2xl">Financial Advice</p>
                    <p className="text-lg">{data.result.financialAdvice}</p>
                </div>

                <div className="mt-2 px-2">
                    <p className="text-2xl">Salary Insights</p>
                    <ul>
                        <li className="text-lg">Entry Level: {data.result.salaryInsights?.entryLevel}</li>
                        <li className="text-lg">Mid Career: {data.result.salaryInsights?.midCareer}</li>
                        <li className="text-lg">Senior: {data.result.salaryInsights?.senior}</li>
                        <li className="text-lg">Notes: {data.result.salaryInsights?.notes}</li>
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <PageTransitionEffect>
            <FramedScreen>
                <Navbar />
                <div className="text-white w-full m-auto pt-6 px-6 justify-center items-center overflow-y-auto rounded-2xl custom-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* First row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <label className="mb-2" htmlFor="grades"><p className="text-xl">Academic Grades</p></label>
                                <input className="block bg-black text-white p-4 border-2 rounded-2xl" name="grades" type="text" value={formData.grades} onChange={handleChange} placeholder="Enter Your Grades" />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-2" htmlFor="educationLevel"><p className="text-xl">Current Education Level</p></label>
                                <select className="block bg-black text-white p-4 border-2 rounded-2xl" name="educationLevel" defaultValue={"default"} onChange={handleChange}>
                                    <option value="default">Select your education level</option>
                                    <option value="highSchool">High School / A-Levels / STPM</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="undergraduate">Undergraduate</option>
                                </select>
                            </div>
                        </div>

                        {/* Second row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <label className="mb-2" htmlFor="country"><p className="text-xl">Country of Study Interest</p></label>
                                <select className="block bg-black text-white p-4 border-2 rounded-2xl" name="country" defaultValue={"default"} onChange={handleChange}>
                                    <option value="default">Select country</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="United States">United States</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-2" htmlFor="mbti"><p className="text-xl">MBTI Personality Type</p></label>
                                <select className="block bg-black text-white p-4 border-2 rounded-2xl" name="mbti" defaultValue={"default"} onChange={handleChange}>
                                    <option value="default">Select MBTI type</option>
                                    <option value="INTJ">INTJ - Architect</option>
                                    <option value="INTP">INTP - Logician</option>
                                    <option value="ENTJ">ENTJ - Commander</option>
                                    <option value="ENTP">ENTP - Debater</option>
                                    <option value="INFJ">INFJ - Advocate</option>
                                    <option value="INFP">INFP - Mediator</option>
                                    <option value="ENFJ">ENFJ - Protagonist</option>
                                    <option value="ENFP">ENFP - Campaigner</option>
                                    <option value="ISTJ">ISTJ - Logistician</option>
                                    <option value="ISFJ">ISFJ - Defender</option>
                                    <option value="ESTJ">ESTJ - Executive</option>
                                    <option value="ESFJ">ESFJ - Consul</option>
                                    <option value="ISTP">ISTP - Virtuoso</option>
                                    <option value="ISFP">ISFP - Adventurer</option>
                                    <option value="ESTP">ESTP - Entrepreneur</option>
                                    <option value="ESFP">ESFP - Entertainer</option>
                                </select>
                            </div>
                        </div>

                        {/* Third row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <label className="mb-2" htmlFor="annualHouseholdIncome"><p className="text-xl">Annual Household Income</p></label>
                                <input className="block p-4 border-2 rounded-2xl" name="annualHouseholdIncome" type="text" value={formData.annualHouseholdIncome} onChange={handleChange} placeholder="" />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-2" htmlFor="extracurricular"><p className="text-xl">Extracurricular Activities</p></label>
                                <input className="block p-4 border-2 rounded-2xl" name="extracurricular" type="text" value={formData.extracurricular} onChange={handleChange} placeholder="" />
                            </div>
                        </div>

                        {/* Fourth row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <label className="mb-2" htmlFor="company"><p className="text-xl">Preferred Company</p></label>
                                <input className="block p-4 border-2 rounded-2xl" name="company" type="text" value={formData.company} onChange={handleChange} placeholder="" />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-2" htmlFor="jobRole"><p className="text-xl">Preferred Job Role</p></label>
                                <input className="block p-4 border-2 rounded-2xl" name="jobRole" type="text" value={formData.jobRole} onChange={handleChange} placeholder="" />
                            </div>
                        </div>

                        {/* Last row */}
                        <div className="flex flex-col">
                            <label className="mb-2" htmlFor="course"><p className="text-xl">Preferred Course/Major</p></label>
                            <input className="block p-4 border-2 rounded-2xl" name="course" type="text" value={formData.course} onChange={handleChange} placeholder="" />
                        </div>
                        <div className="m-auto">
                            <button className="bg-white m-auto rounded-2xl" type="submit"><p className="text-black p-3">Get Personalized Recommendations</p></button>
                        </div>
                    </form>
                    {renderRecommendation(generatedRecommendation)}
                </div>
            </FramedScreen>
        </PageTransitionEffect>
    )
}