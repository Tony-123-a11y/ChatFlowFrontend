import { MessageSquare, Users } from 'lucide-react'

export default function EmptyChat() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-108px)] bg-white px-4 py-12">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center">
            <MessageSquare className="h-12 w-12 text-purple-600" />
          </div>
        </div>
        
        <h1 className="text-xl font-bold text-gray-800 mb-3">
          Select a friend to start a chat
        </h1>
        
        <p className="text-gray-600 mb-6">
          Your messages will appear here once you select someone to chat with.
        </p>
       
      </div>
    </div>
  )
}
