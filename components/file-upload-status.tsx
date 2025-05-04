"use client"

import {Trash2Icon} from "lucide-react"
import PdfIcon from "@/components/icons/pdf-icon";
import ProcessingIcon from "@/components/icons/processing-icon";
import CompletedIcon from "@/components/icons/complated-icon";
import CancelButton from "@/components/icons/cancel-icon";
import {useIsMobile} from "@/hooks/use-mobile";

interface FileUploadStatusProps {
    file: File
    status: "uploading" | "completed"
    progress?: number
    onRemove: () => void
}

export default function FileUploadStatus({file, status, progress = 100, onRemove}: FileUploadStatusProps) {

    const isMobile = useIsMobile()

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B"
        const kb = bytes / 1024
        return kb.toFixed(0) + " KB"
    }

    const getFileExtension = (filename: string) => {
        return filename.split(".").pop()?.toUpperCase() || "FILE"
    }

    const fileExt = getFileExtension(file.name)
    const isUploading = status === "uploading"
    const progressWidth = `${progress}%`

    return (
        <div className="mt-4 bg-orange-50 rounded-lg p-4">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <PdfIcon width={isMobile ? '45' : '56'} height={isMobile ? '45' : '56'} />
                    <div className="ml-4">
                        <p className="text-gray-800">{file.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                            {isUploading ? (
                                <span>
                  {formatFileSize(Math.floor((file.size * progress) / 100))} of {formatFileSize(file.size)}
                </span>
                            ) : (
                                <span>
                  {formatFileSize(file.size)} of {formatFileSize(file.size)}
                </span>
                            )}
                            <span className="mx-2">•</span>
                            {isUploading ? (
                                <span className="flex row items-center gap-1 text-black "> <ProcessingIcon/>Uploading...</span>
                            ) : (
                                <span className="flex items-center text-black gap-1">
                  <CompletedIcon/>
                  <span>Completed</span>
                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-start h-full">
                    {isUploading ?
                        <CancelButton onClick={onRemove} />
                        :
                        <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
                            <Trash2Icon className="w-4 h-4 md:w-5 md:h-5  text-red-500"/>
                        </button>
                    }
                </div>
            </div>

            {isUploading && (
                <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF5C35]" style={{width: progressWidth}}></div>
                </div>
            )}
        </div>
    )
}
