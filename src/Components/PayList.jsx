const people = [
    {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      amount: '540',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      amount: '2320',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      amount: '4650',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      amount: '750',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Courtney Henry',
      email: 'courtney.henry@example.com',
      amount: '1070',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      amount: '22880',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
  ]
  
let UsDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })


  export default function PayList() {
    return (
      <div className="px-6">
        <ul role="list" className="divide-y divide-gray-100">
            {people.map((person) => (
            <li key={person.email} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                <div className="min-w-0 flex-auto">
                    <div className="flex">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name} </p>
                        {person.lastSeen ? (
                            <div className="mt-1 ml-4 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-yellow-500/20 p-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                            </div>
                            <p className="text-xs leading-5 text-gray-500">Pending</p>
                            </div>
                        ) : (
                            <div className="mt-1 ml-4 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs leading-5 text-gray-500">Completed</p>
                            </div>
                        )}
                    </div>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{UsDollar.format(person.amount)}</p>
                {person.lastSeen ? (
                    <div className="mt-1 flex items-center gap-x-1.5">
                    {/* <div className="flex-none rounded-full bg-yellow-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                    </div> */}
                    <p className="text-xs leading-5 text-gray-500">Pending</p>
                    </div>
                ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                    {/* <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div> */}
                    <p className="text-xs leading-5 text-gray-500">Completed</p>
                    </div>
                )}
                </div>
            </li>
            ))}
        </ul>
      </div>
    )
  }
  