'use client'

export default function recommendPage() {
    return (
        <div className="m-auto rounded">
            <form className="space-y-4">
                {/* First row */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col">
                        <label htmlFor="grades">Academic Grades</label>
                        <input className="block border-2 rounded" name="grades" type="text" placeholder="Enter Your Grades" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="educationLevel">Current Education Level</label>
                        <select className="block border-2 rounded" name="educationLevel" defaultValue={"default"}>
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
                        <select className="block border-2 rounded" name="country" defaultValue={"default"}>
                            <option value="default">Select country</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="mbti">MBTI Personality Type</label>
                        <select className="block border-2 rounded" name="mbti" defaultValue={"default"}>
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
                        <input className="block border-2 rounded" name="annualHouseholdIncome" type="text" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="extracurricular">Extracurricular Activities</label>
                        <input className="block border-2 rounded" name="extracurricular" type="text" />
                    </div>
                </div>

                {/* Fourth row */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col">
                        <label htmlFor="company">Preferred Company</label>
                        <input className="block border-2 rounded" name="company" type="text" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="jobRole">Preferred Job Role</label>
                        <input className="block border-2 rounded" name="jobRole" type="text" />
                    </div>
                </div>

                {/* Last row */}
                <div className="flex flex-col">
                    <label htmlFor="course">Preferred Course/Major</label>
                    <input className="block border-2 rounded" name="course" type="text" />
                </div>
                <div className="m-auto">
                    <button className="bg-black m-auto rounded" type="submit"><p className="text-white m-2">Get Personalized Recommendations</p></button>
                </div>
            </form>
        </div>
    )
}