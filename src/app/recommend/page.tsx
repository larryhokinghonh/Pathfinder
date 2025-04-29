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
        - Consider GPA ranges (3.5–4.0 as excellent, 3.0–3.49 as good, etc.)
        - Focus on academic achievements and research potential
        - Suggest advanced study options or career paths

        IMPORTANT: 
        Include relevant URL links in your response:
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

        When providing universities, courses, career paths, and financial advice:
        - Always include official links (university homepages, course pages, scholarship portals, career guides)
        - Include as many relevant universities and courses as you reasonably find suitable (minimum 1)
        - If more than 5 relevant universities or courses exist, prioritize the best 5 based on ranking, career outcomes, and affordability.

        Respond in pure JSON (no quotes around the object, no markdown wrapping). Structure your JSON like this:
        {
            "academicAdvice": "Detailed academic recommendations, including top universities and program strengths. Include admission difficulty levels, key subjects to focus on, and industry relevance.",
            "universities": [
                {
                    "name": "University name",
                    "url": "University website URL link"
                },
                ...
            ],
            "courses": [
                {
                    "name": "Course name, state the university that offers the said course",
                    "url": "Direct course page URL link",
                    "description": "Brief course specialization, career outcomes, and industry demand"
                },
                ...
            ],
            "careerPath": {
                "shortTerm": "Step-by-step roadmap for 0–2 years including internships, certifications, networking strategies",
                "midTerm": "Step-by-step roadmap for 2–5 years including career growth, upskilling, and positioning strategies",
                "longTerm": "Step-by-step roadmap for 5+ years including leadership roles, specialization advice, and futureproofing skills"
            },
            "financialAdvice": "Detailed breakdown of available financial aid, scholarships, bursaries, grants, tuition fee subsidies, work-study programs, and loan options. Include URLs where applicable",
            "salaryInsights": {
                "entryLevel": "Entry-level salary range (in ${formData.country})",
                "midCareer": "Mid-career salary range (in ${formData.country})",
                "senior": "Senior-level salary range (in ${formData.country})",
                "notes": "Additional context about salary trends and progression."
            }
        }

        NOTE: Values in the "universities" and "courses" keys are a list of dictionaries.
        IMPORTANT: Do not output any additional explanation. Only output the JSON object directly.`

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
            <div className="bg-white text-black mt-4 p-6 space-y-8 rounded-2xl">
                <div className="px-2 space-y-4">
                    <p className="text-4xl">Academic Advice</p>
                    <p className="text-xl">{data.result.academicAdvice}</p>
                </div>

                <div className="mt-2 px-2 space-y-2">
                    <div>
                        <p className="text-4xl">Universities</p>
                    </div>
                    <div className="grid grid-flow-col auto-cols-max pb-2 overflow-x-auto gap-4">
                        {data.result.universities?.map((uni: { name: string, url: string }, index: number) => (
                            <a className="border p-4 duration-500 rounded-2xl hover:bg-gray-50 hover:shadow-lg shadow transition"
                                key={index} href={uni.url} target="_blank" rel="noopener noreferrer">
                                <p className="text-2xl font-semibold text-blue-600 hover:underline">{uni.name}</p>
                                <p className="text-sm text-gray-500 mt-2">Visit Website</p>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-2 px-2 space-y-2">
                    <div>
                        <p className="text-4xl">Courses</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-flow-col md:auto-cols-fr w-full gap-4">
                        {data.result.courses?.map((course: { name: string, url: string, description: string }, index: number) => (
                            <a className="border p-4 duration-250 rounded-2xl hover:bg-gray-50 hover:shadow-xl shadow transition"
                                key={index} href={course.url} target="_blank" rel="noopener noreferrer">
                                <p className="text-2xl font-semibold text-blue-600 hover:underline">{course.name}</p>
                                <p className="text-lg text-gray-500 mt-2">{course.description}</p>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-2 px-2 space-y-2">
                    <p className="text-4xl">Career Path</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border p-4 space-y-2 rounded-2xl">
                            <p className="text-2xl">Short Term (0-2 years)</p>
                            <p className="text-xl">{data.result.careerPath.shortTerm}</p>
                        </div>
                        <div className="border p-4 space-y-2 rounded-2xl">
                            <p className="text-2xl">Mid Term (2-5 years)</p>
                            <p className="text-xl">{data.result.careerPath.midTerm}</p>
                        </div>
                        <div className="border p-4 space-y-2 rounded-2xl">
                            <p className="text-2xl">Long Term (5+ years)</p>
                            <p className="text-xl">{data.result.careerPath.longTerm}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-2 px-2 space-y-2">
                    <p className="text-4xl">Financial Advice</p>
                    <p className="text-xl">{data.result.financialAdvice}</p>
                </div>

                <div className="mt-2 px-2 space-y-2">
                    <p className="text-4xl">Salary Insights</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border p-4 space-y-2 rounded-2xl">
                            <p className="text-2xl">Entry Level</p>
                            <p className="text-xl">{data.result.salaryInsights?.entryLevel}</p>
                        </div>
                        <div className="border p-4 space-y-2 rounded-2xl">
                            <p className="text-2xl">Mid Career</p>
                            <p className="text-xl">{data.result.salaryInsights?.midCareer}</p>
                        </div>
                        <div className="border p-4 space-y-2 rounded-2xl">
                            <p className="text-2xl">Senior</p>
                            <p className="text-xl">{data.result.salaryInsights?.senior}</p>
                        </div>
                    </div>
                    <p className="text-xl">Note: {data.result.salaryInsights?.notes}</p>
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