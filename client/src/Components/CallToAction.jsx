import React from "react";
import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col gap-2">
        <div>
          <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
          <p className="text-gray-500">
            Check Out These Resources With 100 JavaScript Projects
          </p>
        </div>
        <Button
          gradientDuoTone={"purpleToPink"}
          className="rounded-tl-xl rounded-bl-none"
        >
          <a target="_blank" rel="noopener norefferer">
            100 JS Projects
          </a>
        </Button>
      </div>
      <div className="p-7">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DmLCy9PSJfFqO55mNTYOQLx3x8THsbokkw&s" />
      </div>
    </div>
  );
}
