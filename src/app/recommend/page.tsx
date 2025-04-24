'use client'
import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar'

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

    // Handle user input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        // Cancels event if it's cancelable, default action belonging to event will not occur
        // Prevents form to be submitted when form input is not validated 
        e.preventDefault();

        const prompt = `Please provide detailed, structured career advisory and recommendations based on the student's profile:

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
            <div>
                <div>
                    <p>Academic Advice</p>
                    <p>{data.result.academicAdvice}</p>
                </div>

                <div>
                    <p>Universities</p>
                    <ul>
                        {data.result.universities?.map((uni: string, index: number) => (
                            <li key={index}>{uni}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p>Courses</p>
                    <ul>
                        {data.result.courses?.map((course: string, index: number) => (
                            <li key={index}>{course}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p>Career Path</p>
                    <p>{data.result.careerPath}</p>
                </div>

                <div>
                    <p>Financial Advice</p>
                    <p>{data.result.financialAdvice}</p>
                </div>

                <div>
                    <p>Salary Insights</p>
                    <ul>
                        <li>Entry Level: {data.result.salaryInsights?.entryLevel}</li>
                        <li>Mid Career: {data.result.salaryInsights?.midCareer}</li>
                        <li>Senior: {data.result.salaryInsights?.senior}</li>
                        <li>Notes: {data.result.salaryInsights?.notes}</li>
                    </ul>
                </div>
            </div>
        );
    };

    return (

        <div>
            <Navbar/>
            <div className="m-auto rounded">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First row */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="flex flex-col">
                            <label htmlFor="grades">Academic Grades</label>
                            <input className="block border-2 rounded" name="grades" type="text" value={formData.grades} onChange={handleChange} placeholder="Enter Your Grades" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="educationLevel">Current Education Level</label>
                            <select className="block border-2 rounded" name="educationLevel" defaultValue={"default"} onChange={handleChange}>
                                <option value="default">Select your education level</option>
                                <option value="highSchool">High School / A-Levels / STPM</option>
                                <option value="diploma">Diploma</option>
                                <option value="undergraduate">Undergraduate</option>
                            </select>
                        </div>
                    </div>

                    {/* Second row */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="flex flex-col">
                            <label htmlFor="country">Country of Study Interest</label>
                            <select className="block border-2 rounded" name="country" defaultValue={"default"} onChange={handleChange}>
                                <option value="default">Select country</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="mbti">MBTI Personality Type</label>
                            <select className="block border-2 rounded" name="mbti" defaultValue={"default"} onChange={handleChange}>
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
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="flex flex-col">
                            <label htmlFor="annualHouseholdIncome">Annual Household Income</label>
                            <input className="block border-2 rounded" name="annualHouseholdIncome" type="text" value={formData.annualHouseholdIncome} onChange={handleChange} placeholder="" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="extracurricular">Extracurricular Activities</label>
                            <input className="block border-2 rounded" name="extracurricular" type="text" value={formData.extracurricular} onChange={handleChange} placeholder="" />
                        </div>
                    </div>

                    {/* Fourth row */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="flex flex-col">
                            <label htmlFor="company">Preferred Company</label>
                            <input className="block border-2 rounded" name="company" type="text" value={formData.company} onChange={handleChange} placeholder="" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="jobRole">Preferred Job Role</label>
                            <input className="block border-2 rounded" name="jobRole" type="text" value={formData.jobRole} onChange={handleChange} placeholder="" />
                        </div>
                    </div>

                    {/* Last row */}
                    <div className="flex flex-col">
                        <label htmlFor="course">Preferred Course/Major</label>
                        <input className="block border-2 rounded" name="course" type="text" value={formData.course} onChange={handleChange} placeholder="" />
                    </div>
                    <div className="m-auto">
                        <button className="bg-black m-auto rounded" type="submit"><p className="text-white m-2">Get Personalized Recommendations</p></button>
                    </div>
                </form>
            </div>

            {renderRecommendation(generatedRecommendation)}
        </div>
    )
}