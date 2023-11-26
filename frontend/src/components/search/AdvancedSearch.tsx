import React, { useState } from "react"
import FilterButtons from "../filter/FilterButtons"

type Rule = {
    id: number
    field: string
    operator: string
    value: string
}

const initialRule: Rule = { id: Date.now(), field: "", operator: "", value: "" }

const AdvancedSearch: React.FC = () => {
    const [rules, setRules] = useState<Rule[]>([])
    const [tempRule, setTempRule] = useState<Rule>({ ...initialRule })

    const handleTempRuleChange = (field: keyof Rule, value: string) => {
        setTempRule({ ...tempRule, [field]: value })
    }

    const addRule = () => {
        setRules([...rules, { ...tempRule, id: Date.now() }])
        setTempRule({ ...initialRule })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Searching with rules:", rules)
    }

    return (
        <div className="my-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 ">
                    <select
                        className="border p-2"
                        value={tempRule.field}
                        onChange={(e) => handleTempRuleChange("field", e.target.value)}
                    >
                        <option value="title">Title</option>
                        <option value="creationDate">Creation Date</option>
                    </select>
                    <select
                        className="border p-2"
                        value={tempRule.operator}
                        onChange={(e) => handleTempRuleChange("operator", e.target.value)}
                    >
                        <option value="equals">is equal to</option>
                        <option value="contains">contains</option>
                    </select>
                    <input
                        type="text"
                        className="border p-2 rounded-lg"
                        value={tempRule.value}
                        onChange={(e) => handleTempRuleChange("value", e.target.value)}
                    />

                    <button type="button" className="bg-teal-500 text-white p-2 font-semibold" onClick={addRule}>
                        Dodaj regułę
                    </button>
                    <button type="submit" className="font-semibold bg-sky-500 text-white p-2">
                        Wyszukaj
                    </button>
                </div>

                {rules.map((rule) => (
                    <div key={rule.id} className="flex items-center gap-2">
                        <span className="border p-2">{rule.field}</span>
                        <span className="border p-2">{rule.operator}</span>
                        <span className="border p-2">{rule.value}</span>
                    </div>
                ))}
            </form>
            <hr className="border-t border-gray-200 my-4 dark:border-gray-700"/>
            <h2 className="mb-2">Filtry</h2>
            <FilterButtons/>
        </div>
    )
}

export default AdvancedSearch
