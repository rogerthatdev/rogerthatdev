export default function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mt-2 text-sm">© {new Date().getFullYear()} Roger That Dev. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}