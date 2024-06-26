import Image from "next/image";
import MaxWidthWrapper from "../components/max_width_wrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Cloud } from "@/components/design";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-m font-semibold text-gray-800">Every Task Tells a Tale!</p>
        </div>
        <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
          <span className='text-blue-600'>TaskTale: </span>{' '}
          Your Personal Task Revolution!
        </h1>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
        Ready for a Transformation? With Us, You can Easily Manage Tasks by Booking Skilled Workers for Various Services, Ensuring a Seamless and Efficient Experience Tailored Just for You. Simply Book Now and Embrace the Convenience of Instant Solutions, Turning Every Task into a Well-Crafted Tale of Success.
        </p>
        <Link
          className={buttonVariants({
            size: 'lg',
            className: 'mt-5',
          })}
          href='/dashboard'
          target='_blank'>
          Book Now{' '}
          <ArrowRight className='ml-2 h-5 w-5' />
        </Link>
      </MaxWidthWrapper>


      <div>
        <div className='relative isolate'>
          <Cloud />
          
          <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/dashboard-preview.jpg'
                    alt='product preview'
                    width={1364}
                    height={866}
                    quality={100}
                    className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
          </div>

          <Cloud />
        </div>
      </div>

      {/* Feature section */}
      <div className='mx-auto mb-32 mt-32 max-w-5xl sm:mt-56'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
              Task Ease at Your Fingertips!
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
              Conquring Tasks has never been
              easier than with Tasktale.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className='my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 1
              </span>
              <span className='text-xl font-semibold'>
                Browse Task Options
              </span>
              <span className='mt-2 text-zinc-700'>
              Explore and find the right {' '}
                <Link
                  href='/pricing'
                  className='text-blue-700 underline underline-offset-2'>
                  service
                </Link>
                .
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 2
              </span>
              <span className='text-xl font-semibold'>
                Describe Your Task
              </span>
              <span className='mt-2 text-zinc-700'>
                Provide a brief description of your task.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-sm font-medium text-blue-600'>
                Step 3
              </span>
              <span className='text-xl font-semibold'>
                Choose Your Tasker
              </span>
              <span className='mt-2 text-zinc-700'>
                Simply select the Tasker that fits your preferences.
              </span>
            </div>
          </li>
        </ol>

        <div className='mx-auto max-w-6xl px-6 lg:px-8'>
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src='/file-upload-preview.jpg'
                alt='uploading preview'
                width={1419}
                height={732}
                quality={100}
                className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
