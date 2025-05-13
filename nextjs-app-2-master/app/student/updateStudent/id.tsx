// "use client";

// import { useRouter } from "next/router";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import React from "react";
// import { Student } from "../createStudent/table";
// import { Button } from "@/components/ui/button"; // Ensure this is correctly exported
// import { Input } from "@/components/ui/input";   // Ensure this is correctly exported

// async function fetchStudentById(id: string) {
//   const response = await fetch(`http://localhost:8000/api/student/${id}`);
//   if (!response.ok) {
//     throw new Error("Erreur lors de la récupération de l'étudiant");
//   }
//   return response.json();
// }

// async function updateStudent(id: string, student: Partial<Student>) {
//   const response = await fetch(`http://localhost:8000/api/update-student/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(student),
//   });
//   if (!response.ok) {
//     throw new Error("Erreur lors de la mise à jour de l'étudiant");
//   }
//   return response.json();
// }

// export function EditStudentModal() {
//   const router = useRouter();
//   const { id } = router.query;

//   const queryClient = useQueryClient();
//   const { data: student, isLoading, isError, error } = useQuery({
//     queryKey: ['student', id],
//     queryFn: () => fetchStudentById(id as string),
//     enabled: !!id,
//   });

//   const mutation = useMutation({
//     mutationFn: (student: Partial<Student>) => updateStudent(id as string, student),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['students']); // Refresh student list
//       router.push('/student/createStudent'); // Redirect after update
//     },
//   });

//   const [name, setName] = React.useState('');
//   const [prenom, setPrenom] = React.useState('');
//   const [classe, setClasse] = React.useState('');
//   const [parent, setParent] = React.useState('');
//   const [telephone, setTelephone] = React.useState('');
//   const [email, setEmail] = React.useState('');

//   React.useEffect(() => {
//     if (student) {
//       setName(student.nomEl || '');
//       setPrenom(student.prenomEl || '');
//       setClasse(student.nomCl || '');
//       setParent(student.nomPar || '');
//       setTelephone(student.telephone || '');
//       setEmail(student.email || '');
//     }
//   }, [student]);

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error?.message}</div>;

//   const handleSubmit = () => {
//     mutation.mutate({
//       nomEl: name,
//       prenomEl: prenom,
//       nomCl: classe,
//       nomPar: parent,
//       telephone,
//       email,
//     });
//   };

//   return (
//     <>
//       {/* Button to trigger modal */}
//       <button
//         type="button"
//         className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//         onClick={() => document.getElementById("edit-student-modal")?.classList.remove("hidden")}
//       >
//         Edit Student
//       </button>

//       {/* Modal */}
//       <div
//         id="edit-student-modal"
//         tabIndex={-1}
//         aria-hidden="true"
//         className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
//       >
//         <div className="relative p-4 w-full max-w-md max-h-full">
//           <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//             <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Edit Student
//               </h3>
//               <button
//                 type="button"
//                 className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                 onClick={() => document.getElementById("edit-student-modal")?.classList.add("hidden")}
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//                 <span className="sr-only">Close modal</span>
//               </button>
//             </div>
//             <div className="p-4 md:p-5">
//               {/* Form Fields */}
//               <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Name
//                   </label>
//                   <Input
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="prenom"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Prenom
//                   </label>
//                   <Input
//                     id="prenom"
//                     value={prenom}
//                     onChange={(e) => setPrenom(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="classe"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Classe
//                   </label>
//                   <Input
//                     id="classe"
//                     value={classe}
//                     onChange={(e) => setClasse(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="parent"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Parent
//                   </label>
//                   <Input
//                     id="parent"
//                     value={parent}
//                     onChange={(e) => setParent(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="telephone"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Telephone
//                   </label>
//                   <Input
//                     id="telephone"
//                     value={telephone}
//                     onChange={(e) => setTelephone(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Email
//                   </label>
//                   <Input
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <Button type="submit" className="bg-blue-700 text-white">Save</Button>
//                   <Button variant="outline" className="border" onClick={() => document.getElementById("edit-student-modal")?.classList.add("hidden")}>Cancel</Button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
