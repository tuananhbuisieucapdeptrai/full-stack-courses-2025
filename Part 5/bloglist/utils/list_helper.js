const dummy = (blogs) => {
    return 1
 }


const totalLikes = (blogs)=>{
    var sum = 0
    blogs.forEach(blog => {
        sum += blog.likes
    })
    return sum
}

const favoriteBlog = (blogs)=>{
    var output = blogs[0]
    blogs.forEach(blog=>{
        if(output.likes<blog.likes){
            output = blog
        }
    })
    return output
}
  

const mostBlogs = (blogs)=>{
    var list = []
    for(let i = 0; i<blogs.length;i++){
        list[i] = blogs[i].author
    }

    var map = new Map()
    for(let i = 0; i<list.length;i++){
        if(!(map.has(list[i]))){
            map.set(list[i],1)
        }
        else{
            var current = map.get(list[i])
            current+=1
            map.set(list[i],current)
        }
    }

    var output = {
        author: "dit con me may",
        blogs: 0
    }

    map.forEach((value, key)=>{
        if(value>output.blogs){
            output = {
                author: key,
                blogs: value
            }
        }

    })

    return output
    
    


}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}