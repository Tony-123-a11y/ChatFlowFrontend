

import { useState } from "react"
import {
  Bookmark,
  Grid,
  List,
  Search,
  Filter,
  ChevronDown,
  Clock,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
  X,
} from "lucide-react"

const SavedPosts = () => {
  // Sample collections/categories
  const [collections] = useState([
    { id: "all", name: "All Saved", count: 24 },
    { id: "articles", name: "Articles", count: 12 },
    { id: "recipes", name: "Recipes", count: 5 },
    { id: "videos", name: "Videos", count: 3 },
    { id: "travel", name: "Travel Ideas", count: 4 },
  ])

  // Sample saved posts data
  const [savedPosts] = useState([
    {
      id: 1,
      title: "10 Essential Tips for Modern Web Design in 2025",
      excerpt:
        "Learn the latest trends and techniques that are shaping the future of web design. From micro-interactions to accessibility improvements...",
      image: "/placeholder.svg?height=200&width=300",
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "@alexjohnson",
      },
      savedDate: "2 days ago",
      originalDate: "May 15, 2025",
      likes: 1243,
      comments: 89,
      category: "articles",
      tags: ["design", "web development", "ui/ux"],
    },
    {
      id: 2,
      title: "Homemade Sourdough Bread Recipe",
      excerpt:
        "The perfect sourdough bread recipe with a crispy crust and soft interior. Follow these step-by-step instructions for bakery-quality bread at home...",
      image: "/placeholder.svg?height=200&width=300",
      author: {
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "@jamiebakes",
      },
      savedDate: "1 week ago",
      originalDate: "April 28, 2025",
      likes: 3567,
      comments: 214,
      category: "recipes",
      tags: ["baking", "bread", "sourdough"],
    },
    {
      id: 3,
      title: "Hidden Gems in Barcelona: A Local's Guide",
      excerpt:
        "Discover the secret spots in Barcelona that most tourists never see. From hidden cafes to breathtaking viewpoints, this guide will transform your visit...",
      image: "/placeholder.svg?height=200&width=300",
      author: {
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "@mariatravel",
      },
      savedDate: "2 weeks ago",
      originalDate: "April 20, 2025",
      likes: 2189,
      comments: 156,
      category: "travel",
      tags: ["barcelona", "travel", "spain"],
    },
    {
      id: 4,
      title: "How to Build a Sustainable Capsule Wardrobe",
      excerpt:
        "Create a versatile and eco-friendly wardrobe with these essential pieces. Learn how to mix and match for endless outfit combinations while reducing waste...",
      image: "/placeholder.svg?height=200&width=300",
      author: {
        name: "Taylor Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "@taylorfashion",
      },
      savedDate: "3 weeks ago",
      originalDate: "April 12, 2025",
      likes: 4521,
      comments: 327,
      category: "articles",
      tags: ["fashion", "sustainability", "minimalism"],
    },
    {
      id: 5,
      title: "Quick 15-Minute Workout for Busy Professionals",
      excerpt:
        "No time for the gym? This efficient workout routine can be done anywhere with no equipment. Perfect for busy schedules and small spaces...",
      image: "/placeholder.svg?height=200&width=300",
      author: {
        name: "Jordan Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "@jordanfit",
      },
      savedDate: "1 month ago",
      originalDate: "April 5, 2025",
      likes: 1876,
      comments: 94,
      category: "articles",
      tags: ["fitness", "health", "workout"],
    },
    {
      id: 6,
      title: "Easy Vegetarian Pad Thai Recipe",
      excerpt:
        "A delicious and authentic Pad Thai recipe that's completely vegetarian. Ready in under 30 minutes with ingredients you can find at any grocery store...",
      image: "/placeholder.svg?height=200&width=300",
      author: {
        name: "Sam Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "@samcooks",
      },
      savedDate: "1 month ago",
      originalDate: "March 28, 2025",
      likes: 2345,
      comments: 178,
      category: "recipes",
      tags: ["vegetarian", "thai", "dinner"],
    },
  ])

  // State for UI
  const [activeCollection, setActiveCollection] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("recent") // recent, popular
  const [selectedTags, setSelectedTags] = useState([])

  // Get all unique tags from posts
  const allTags = [...new Set(savedPosts.flatMap((post) => post.tags))]

  // Filter posts based on active collection, search query, and selected tags
  const filteredPosts = savedPosts.filter((post) => {
    // Filter by collection
    const collectionMatch = activeCollection === "all" || post.category === activeCollection

    // Filter by search query
    const searchMatch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by selected tags
    const tagMatch = selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag))

    return collectionMatch && searchMatch && tagMatch
  })

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "popular") {
      return b.likes - a.likes
    }
    // Default: sort by recent
    return new Date(b.savedDate) - new Date(a.savedDate)
  })

  // Toggle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen w-5/6 ml-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Bookmark className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Saved Posts</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
              aria-label="Grid view"
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
              aria-label="List view"
            >
              <List className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-1 p-2 rounded-md text-gray-500 hover:bg-gray-100"
                aria-label="Show filters"
              >
                <Filter className="h-5 w-5" />
                <span className="hidden sm:inline">Filters</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showFilters && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-400 hover:text-gray-500"
                      aria-label="Close filters"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`text-xs px-2 py-1 rounded-full ${
                            selectedTags.includes(tag)
                              ? "bg-blue-100 text-blue-700 border border-blue-300"
                              : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search saved posts..."
            className="w-full py-3 pl-12 pr-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-4 top-3.5 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
        </div>

        {/* Collections/Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => setActiveCollection(collection.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeCollection === collection.id
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {collection.name} ({collection.count})
              </button>
            ))}
          </div>
        </div>

        {/* Selected Tags Display */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-gray-500 py-1">Filtered by:</span>
            {selectedTags.map((tag) => (
              <div key={tag} className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {tag}
                <button
                  onClick={() => toggleTag(tag)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                  aria-label={`Remove ${tag} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <button onClick={() => setSelectedTags([])} className="text-sm text-gray-500 hover:text-gray-700 py-1">
              Clear all
            </button>
          </div>
        )}

        {/* Posts Grid/List */}
        {sortedPosts.length > 0 ? (
          <div
            className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}`}
          >
            {sortedPosts.map((post) => (
              <div
                key={post.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden ${viewMode === "list" ? "flex" : ""}`}
              >
                {/* Post Image */}
                <div className={`${viewMode === "list" ? "w-1/3 flex-shrink-0" : "w-full"}`}>
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                </div>

                {/* Post Content */}
                <div className={`p-4 ${viewMode === "list" ? "w-2/3" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center mb-3">
                      <img
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{post.author.username}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  <h3 className="font-bold text-lg mb-2 text-gray-900">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Saved {post.savedDate}</span>
                    </div>
                    <div className="flex space-x-3">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{post.comments}</span>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bookmark className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No saved posts found</h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : "Try adjusting your filters or save some posts to see them here"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedPosts
