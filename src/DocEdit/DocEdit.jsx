import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeNav from "../components/Navbar/HomeNav";
import NavbarRight from "../components/Navbar/NavbarRight";
import NavbarLeft from "../components/Navbar/NavbarLeft";
import { useSelector } from "react-redux";
import loaderGif from "../assets/icons/2.gif";
import EditSidebar from "../components/ui/EditSidebar";
import { useNavigate } from "react-router-dom";
import { trimQuotes } from "../utils/utils";
import Markdown from "react-markdown";

const DocEdit = ({ onSave }) => {
    const navigate = useNavigate();
    const ediText = useSelector((state) => state.document.uploadDocText);
    const texteditable = useSelector((state) => state.document.uploadDocText);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeSidebar, setActiveSidebar] = useState("preview");

    useEffect(() => {
        const updatedText = ediText || texteditable;
        if (updatedText) {
            const dispText = trimQuotes(updatedText);
            setText(dispText);
        }
    }, [ediText, texteditable]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleEditClick = () => {
        setActiveSidebar("edit");
    };

    const handlePreviewClick = () => {
        navigate("/summary");
    };

    const handleSave = () => {
        navigate("/Snippets");
    };
    let temp = "Here is a detailed Lease Agreement customized based on the provided details:\n\nLEASE AGREEMENT\n\nThis Lease Agreement is made and entered into on [DATE] by and between:\n\nLessor: [LESSOR'S NAME], having its registered office at [LESSOR'S ADDRESS] (hereinafter referred to as the \"Lessor\")\n\nAND\n\nLessee: [LESSEE'S NAME], having its registered office at [LESSEE'S ADDRESS] (hereinafter referred to as the \"Lessee\")\n\nDESCRIPTION OF PREMISES\nThe Lessor hereby leases to the Lessee the following property: [DETAILED DESCRIPTION OF LEASED PREMISES, INCLUDING ADDRESS, LEGAL DESCRIPTION, AND ANY UNIQUE IDENTIFIERS]. The leased premises is more particularly described and depicted in the attached Schedule A, which is incorporated herein by reference.\n\nLEASE TERM\nThe term of this Lease shall be for a period of [X] years, commencing on [START DATE] and ending on [END DATE] (the \"Lease Term\"), unless sooner terminated as provided herein. The Lessee shall have the option to renew this Lease for an additional [X] year term, subject to the terms and conditions set forth in the \"Renewal\" section below.\n\nMONTHLY RENT\nThe Lessee shall pay to the Lessor a monthly rent of Rs. [AMOUNT] (the \"Monthly Rent\"). The Monthly Rent shall be due and payable on the [DAY] day of each calendar month during the Lease Term.\n\nPAYMENT TERMS\nThe Lessee shall pay the Monthly Rent and all other sums due under this Lease in advance, without demand, deduction, or offset. Payments shall be made by [PAYMENT METHOD, e.g., check, electronic transfer, etc.]. A late fee of [X]% of the Monthly Rent shall be charged for any payment received after the [DAY] day of the month. In the event of non-payment, the Lessor shall have the right to terminate this Lease in accordance with the \"Termination\" section below.\n\nSECURITY DEPOSIT\nUpon execution of this Lease, the Lessee shall pay to the Lessor a security deposit in the amount of Rs. [AMOUNT] (the \"Security Deposit\"). The Security Deposit shall be held by the Lessor as security for the faithful performance by the Lessee of all the terms, covenants, and conditions of this Lease. The Security Deposit shall be returned to the Lessee, without interest, within [X] days after the expiration or earlier termination of this Lease, provided that the Lessee has fully performed all of its obligations under this Lease.\n\nUSE OF PROPERTY\nThe Lessee shall use and occupy the leased premises solely for the purpose of [PERMITTED USE] and for no other purpose without the prior written consent of the Lessor. The Lessee shall not use the leased premises for any unlawful or hazardous purpose, and shall comply with all applicable laws, rules, and regulations governing the use and occupation of the property.\n\nMAINTENANCE AND REPAIRS\nThe Lessee shall, at its own cost and expense, keep and maintain the leased premises in good condition and repair, including all structural and non-structural components, and shall make all necessary repairs and replacements. The Lessor shall be responsible for any major structural repairs to the building, provided that such repairs are not necessitated by the Lessee's negligence or misuse of the premises. The Lessee shall promptly notify the Lessor of any needed repairs or maintenance.\n\nUTILITIES AND SERVICES\nThe Lessee shall be responsible for the payment of all utility services provided to the leased premises, including but not limited to electricity, water, gas, telephone, internet, and any other services. The Lessee shall also be responsible for the payment of all applicable taxes, fees, and other charges associated with the use and occupation of the property.\n\nTERMINATION\nEither party may terminate this Lease by providing the other party with [X] months' prior written notice. The Lessor shall have the right to terminate this Lease immediately upon the occurrence of any of the following events: (i) the Lessee's failure to pay the Monthly Rent or any other sums due hereunder, (ii) the Lessee's breach of any other term, covenant, or condition of this Lease, or (iii) the Lessee's insolvency, bankruptcy, or assignment for the benefit of creditors.\n\nRENEWAL\nUpon the expiration of the initial Lease Term, the Lessee shall have the option to renew this Lease for an additional [X] year term, provided that the Lessee gives the Lessor written notice of its intent to renew at least [X] months prior to the expiration of the current Lease Term. The Monthly Rent for the renewal term shall be increased by [X]% of the current Monthly Rent.\n\nINSURANCE\nThe Lessee shall, at its own cost and expense, maintain a comprehensive general liability insurance policy with limits of not less than Rs. [AMOUNT] per occurrence and Rs. [AMOUNT] in the aggregate, naming the Lessor as an additional insured. The Lessee shall also maintain property insurance covering the leased premises and all of the Lessee's personal property located therein.\n\nSETTLEMENT\nUpon the expiration or earlier termination of this Lease, the Lessee shall surrender the leased premises in the same condition as it was at the commencement of the Lease Term, ordinary wear and tear excepted. The Lessor shall have the right to deduct from the Security Deposit any amounts necessary to repair any damage to the leased premises or to clean the premises. Any remaining balance of the Security Deposit shall be returned to the Lessee within [X] days of the termination or expiration of this Lease.\n\nGOVERNING LAW\nThis Lease Agreement shall be governed by and construed in accordance with the laws of the [STATE/PROVINCE] of [NAME]. The parties agree to submit to the exclusive jurisdiction of the courts of [CITY/JURISDICTION] for the resolution of any disputes arising under this Lease.\n\nENTIRE AGREEMENT\nThis Lease Agreement, including the attached Schedule A, constitutes the entire agreement between the parties and supersedes all prior agreements, understandings, and negotiations, whether oral or written, with respect to the subject matter hereof. This Lease may be amended or modified only by a written instrument signed by both the Lessor and the Lessee.\n\nMISCELLANEOUS\nThis Lease Agreement shall be binding upon and inure to the benefit of the parties hereto and their respective heirs, successors, and permitted assigns. If any provision of this Lease is found to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable. This Lease may be executed in counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same instrument.\n\nIN WITNESS WHEREOF, the parties have executed this Lease Agreement as of the date first written above.\n\nLESSOR:\n[LESSOR'S NAME]\n\nBy: _____________________________\nName: [NAME]\nTitle: [TITLE]\n\nLESSEE:\n[LESSEE'S NAME]\n\nBy: _____________________________\nName: [NAME]\nTitle: [TITLE]\n\nWITNESSES:\n1. _____________________________\nName: [NAME]\n\n2. _____________________________\nName: [NAME]\n\nNOTARY PUBLIC:\n_____________________________\nName: [NAME]\nSeal:"

    return (
        <main className="h-screen w-full">
            <section className="flex flex-col p-5 space-y-5 items-center w-full h-full">
                {/* Navbar */}
                <div className="w-full justify-between items-center flex flex-row">
                    <NavbarRight />
                    <NavbarLeft />
                </div>

                <div className="flex flex-row w-full space-x-5 rounded-md h-[87vh] justify-center items-start">
                    <div className="flex flex-col bg-customBlack rounded-md w-[70%] h-full space-y-5 justify-between p-5">
                        <div className="border-white bg-card-gradient flex flex-col justify-center items-center border-2 rounded-md w-full h-[90%]">
                            {loading ? (
                                <img
                                    className="flex flex-row justify-center items-center w-40 h-40"
                                    src={loaderGif}
                                    alt="Loading..."
                                />
                            ) : (
                                <div className="hide-scrollbar p-2 h-full overflow-y-auto">
                                    <Markdown>
                                        {text}
                                    </Markdown>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-row justify-end items-center gap-5">
                            <button
                                className="rounded-md p-2 bg-card-gradient text-white font-semibold"
                                onClick={handleEditClick}
                            >
                                Edit Document With AI
                            </button>
                            <button
                                className="p-2 px-5 rounded-md border-2 border-teal-700"
                                onClick={handlePreviewClick}
                            >
                                Summary
                            </button>
                            <button
                                onClick={handleSave}
                                className="p-2 rounded-md px-10 border-2 border-teal-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    <div className="w-[30%] h-full overflow-hidden bg-customBlack rounded-md p-5">
                        <AnimatePresence mode="wait">
                            {activeSidebar === "edit" ? (
                                <motion.div
                                    key="edit"
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -300, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-transparent rounded-md w-full h-full"
                                >
                                    <EditSidebar />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="preview"
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -300, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="p-4 bg-transparent rounded-md w-full"
                                >
                                    <h4 className="font-semibold">Document Preview</h4>
                                    <p>
                                        Please check the Document Preview before proceeding with AI
                                        Drafter.
                                    </p>
                                    <span className="text-teal-500 font-semibold">
                                        Adira AI Drafter
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default DocEdit;
