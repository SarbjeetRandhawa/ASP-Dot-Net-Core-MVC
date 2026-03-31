import * as React from "react"


// import { cn } from "../../../lib/utils"

function Input({  type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      
      {...props}
    />
  )
}

export { Input }