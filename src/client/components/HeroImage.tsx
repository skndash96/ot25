import React from 'react'
import { useLoadingContext } from '../context/LoadingContext'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function HeroImage() {
  const { completedEndAnimation } = useLoadingContext()
  const ref = React.useRef<SVGCircleElement | null>(null)

  useGSAP(() => {
    if (!completedEndAnimation) {
      gsap.to(ref.current, {
        scale: 0,
        transformOrigin: 'center',
      })
    } else {
      gsap.to(ref.current, {
        duration: 0.6,
        scale: 1,
        ease: 'expo.out',
      })
    }
  }, [completedEndAnimation])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1856 1002.667"
      className="select-none w-screen h-full"
      preserveAspectRatio="xMidYMax slice"
    >
      <g transform="translate(0 18)">
        <circle
          ref={ref}
          cx={928}
          cy={574.686}
          r={320.901}
          style={{
            fill: '#fd7906',
            fillOpacity: 1,
            fillRule: 'evenodd',
            strokeWidth: 1.00184,
          }}
        />
        <path
          d="M0 512.37s140.137-13.346 164.049-26.136c23.912-12.79 120.117-82.302 149.59-82.858 29.473-.556 113.444 91.756 155.151 110.663 41.708 18.907 219.659 141.249 248.576 149.034 28.917 7.786 169.127 87.241 210.634 80.003 41.507-7.239 204.475-58.96 234.36-71.544 29.884-12.583 152.569-44.04 190.318-74.712 37.75-30.67 144.705-180.095 183.24-181.667 38.536-1.573 116.394 58.983 143.133 67.633C1705.79 491.437 1856 511.098 1856 511.098v509.569H0Z"
          style={{
            display: 'inline',
            fill: '#b86f21',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M0 465.485s105.659 41.348 119.005 53.848c13.346 12.501 115.668 88.13 140.136 98.14C283.61 627.483 440.43 681.98 456 685.317c15.57 3.337 137.704 94.537 166.83 96.761 29.125 2.224 268.207-51.563 305.17-52.35 36.963-.786 219.908 53.479 256.38 53.479 36.47 0 283.961-111.95 323.227-125.044 40.664-13.56 144.581-40.69 153.847-47.187 13.154-9.222 119.048-82.576 156.797-82.576H1856v492.267H0Z"
          style={{
            fill: '#894a1c',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M0 914.166h1856v134.5H0z"
          style={{
            fill: '#1e2210',
            fillOpacity: 1,
            stroke: '#5f391e',
            strokeWidth: 0,
            strokeDasharray: 'none',
            strokeOpacity: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M1125.541 850.756s-10.47-3.035-13.317-7.19c-2.847-4.154-.983-9.634-.983-9.634s-7.526-8.061-6.97-26.69c.556-18.63 14.32-25.164 14.32-25.164s-10.428-13.624-2.364-31.837c8.063-18.212 19.741-13.902 19.741-13.902s5.978-38.37 54.915-38.649c48.937-.278 50.466 32.81 50.466 32.81s17.965-1.193 22.105 12.576c4.14 13.768-2.086 24.96-2.086 24.96s14.18 6.257 15.432 14.042c1.251 7.785-4.17 16.822-4.17 16.822s9.87 3.615 9.175 10.566c-.695 6.951-10.983 18.63-10.983 18.63s2.224 6.95-.417 12.233c-2.642 5.283-15.293 11.54-15.293 11.54s-5.7 12.094-21.827 18.35c-16.126 6.257-39.193-2.885-39.193-2.885l-10.204-.273s-15.805 8.797-34.434 6.217c-18.63-2.58-23.913-22.522-23.913-22.522zM1527.6 791.254s-13.902-13.069-12.512-40.04c1.39-26.97 16.96-32.531 16.96-32.531s-5.56-42.264 16.128-67.01c21.687-24.746 45.67-21.132 45.67-21.132s19.144-44.534 73.408-40.012c54.265 4.522 66.258 37.356 66.258 37.356s36.373 3.932 50.529 29.098c14.156 25.166 12.583 60.753 12.583 60.753s19.66 17.891 19.07 37.552c-.589 19.661-16.318 44.237-16.318 44.237s-9.044 36.373-32.44 52.102c-23.397 15.729-63.101 20.596-75.1 19.637-11.999-.959-30.908-3.211-30.908-3.211s-86.616 5.848-101.353-14.066c-14.736-19.914-31.975-62.733-31.975-62.733z"
          style={{
            display: 'inline',
            fill: '#2a371e',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
          transform="translate(0 18)"
        />
        <path
          d="M1403.645 863.281s-17.347 10.17-23.638 12.922c-6.292 2.753-24.183-1.572-24.183-1.572s-67.24.59-77.661-45.614c-10.42-46.203 14.746-61.932 14.746-61.932s1.769-25.953 6.684-33.62c4.915-7.668 16.319-7.079 16.319-7.079s9.24-35.98 42.074-30.867c32.834 5.112 37.553 32.244 37.553 32.244s8.483-1.299 11.614 4.07c3.132 5.367-3.508 131.448-3.508 131.448z"
          style={{
            display: 'inline',
            fill: '#1e240f',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
          transform="translate(0 18)"
        />
        <path
          d="M1460.42 872.861s-36.254 6.256-50.713-4.032c-14.458-10.288-22.8-36.702-22.8-36.702s-10.566-10.844-10.287-22.244c.278-11.4 9.453-12.79 9.453-12.79s-5.56-4.672-2.224-11.373c3.336-6.7 9.453-11.983 9.453-11.983s-9.731-12.235.278-28.918c10.01-16.682 21.132-14.026 21.132-14.026s11.4-42.974 49.493-38.803c38.093 4.17 48.658 38.803 48.658 38.803l49.493 25.983-6.395 65.62s-2.246 11.663-6.425 15.532c-4.18 3.869-8.505 7.211-8.505 7.211s-7.078 22.807-22.807 29.492c-15.73 6.684-57.804-1.77-57.804-1.77z"
          style={{
            display: 'inline',
            fill: '#2a371e',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
          transform="translate(0 18)"
        />
        <path
          d="M615.878 864.102s-28.083 9.454-35.034 10.566c-6.951 1.112-20.367-3.684-20.367-3.684s-23.287 2.92-30.238 1.46c-6.951-1.46-19.463-12.79-19.463-12.79s-20.298-4.171-26.415-25.303c-6.117-21.132 29.195-84.249 29.195-84.249s3.337-46.156 33.088-53.107c29.751-6.951 46.434 11.4 46.434 11.4s7.11-7.507 10.566-10.01c3.455-2.502 7.42-.31 7.42-.31s12.683-37.285 51.905-39.52c39.223-2.233 52.692 38.143 52.692 38.143s12.827.297 17.554 13.087c4.726 12.79 1.112 33.29 1.112 33.29s22.522 7.584 25.58 22.876c3.059 15.293-6.117 39.205-6.117 39.205s6.395 32.532-26.414 52.83c-32.81 20.297-59.572 12.512-59.572 12.512s-4.797 2.432-6.847 2.571c-2.05.14-7.125-2.571-7.125-2.571s-7.508 3.475-20.159 2.224-17.795-8.62-17.795-8.62zM252.84 859.885s-9.83 12.976-29.098 16.515c-19.267 3.539-36.57-5.346-36.57-5.346s-4.633 3.197-10.125 3.058c-5.49-.139-10.125 0-10.125 0s-21.78 3.615-32.902.834c-11.122-2.78-27.805-15.014-27.805-15.014s-30.308-7.23-41.708-26.415c-11.4-19.185-7.785-35.59-7.785-35.59s-15.015-18.351-14.18-37.537c.834-19.185 16.126-26.414 16.126-26.414S57 706.17 65.063 692.268c8.064-13.902 13.347-9.453 13.347-9.453s-3.615-7.23 12.512-25.859c16.127-18.63 23.356-18.351 23.356-18.351s13.902-27.805 33.366-35.312c19.463-7.508 26.693.834 26.693.834s16.404-11.122 36.424 2.224c20.02 13.347 34.478 37.259 34.478 37.259s26.97 12.79 38.927 31.975c11.956 19.186 26.478 111.554 26.478 111.554s5.505 26.936-10.42 46.4c-15.926 19.464-13.37 14.353-18.482 17.695-5.111 3.342-28.901 8.65-28.901 8.65z"
          style={{
            display: 'inline',
            fill: '#1e240f',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
          transform="translate(0 18)"
        />
        <path
          d="M414.258 863.227s-63.917 29.712-106.18-13.762c-42.263-43.475-28.639-85.46-28.639-85.46s-11.237-52.908 11.203-72.332c22.44-19.424 46.075-17.478 46.075-17.478s30.307-43.654 83.415-35.868c53.107 7.785 65.063 40.595 65.063 40.595s10.693-1.326 27.527 13.624c16.833 14.95 4.756 48.98 4.756 48.98s13.96 20.054 14.55 34.996c.589 14.942-10.618 35.193-10.618 35.193s7.471 14.942-3.932 26.346-18.875 10.027-18.875 10.027-14.549 18.482-36.57 20.644c-22.02 2.163-47.775-5.505-47.775-5.505z"
          style={{
            fill: '#29351c',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
          transform="translate(0 18)"
        />
        <path
          d="M166.922 867.946h20.251v59.769h-20.251z"
          style={{
            fill: '#201404',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
          transform="translate(0 18)"
        />
        <path
          d="M453.775 831.465s-10.812 17.497-13.761 21.43c-2.95 3.932-19.66 16.712-19.66 16.712v-24.38h-12.192v26.345s-10.813-7.47-14.549-9.83c-3.735-2.36-19.267-21.43-19.267-21.43l-8.848.393s14.942 21.037 20.447 28.508c5.505 7.471 22.022 16.516 22.022 16.516l-2.36 16.908h18.284v-21.233s20.448-17.893 23.79-21.629c3.343-3.735 16.319-28.31 16.319-28.31Z"
          style={{
            fill: '#201404',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
          transform="translate(0 36)"
        />
        <path
          d="M555.68 870.984h9.593s0 11.47-.07 15.154c-.069 3.684 1.877 14.667 1.877 14.667h-13.415s2.015-12.651 2.015-14.598v-15.223zM653.832 870.498h13.972l2.155 29.473h-18.004zM1181.725 893.014v13.566h12.682l1.18-12.288s13.664-14.353 15.335-16.22c1.671-1.869 9.929-17.99 9.929-17.99h-7.275s-4.227 7.864-6.586 10.42c-2.36 2.556-14.058 12.583-14.058 12.583l1.18-16.024h-10.224l-1.474 19.76s-5.702-4.031-7.373-5.702c-1.671-1.672-7.865-8.651-7.865-8.651l-6.408 1.111s7.588 10.489 9.947 11.275c2.36.787 11.305 5.702 11.305 5.702z"
          style={{
            fill: '#201404',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
          transform="translate(0 18)"
        />
        <path
          d="M453.775 831.465s-10.812 17.497-13.761 21.43c-2.95 3.932-19.66 16.712-19.66 16.712v-24.38h-12.192v26.345s-10.813-7.47-14.549-9.83c-3.735-2.36-19.267-21.43-19.267-21.43l-8.848.393s14.942 21.037 20.447 28.508c5.505 7.471 22.022 16.516 22.022 16.516l-2.36 16.908h18.284v-21.233s20.448-17.893 23.79-21.629c3.343-3.735 16.319-28.31 16.319-28.31Z"
          style={{
            fill: '#201404',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
          transform="matrix(1.07186 0 0 1.0221 1216.903 22.147)"
        />
        <path
          d="M1351.302 870.698h10.814v30.475h-10.814zM1421.098 853.2h4.522l33.62 36.373 1.18-16.712 8.848.393 1.966 17.105 14.143-14.67 2.157.945s-14.014 18.401-14.362 19.792c-.348 1.39.834 19.254.834 19.254h-16.127l.556-16.057s-21.018-21.06-22.296-22.633c-1.278-1.573-15.04-23.79-15.04-23.79Z"
          style={{
            fill: '#201404',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
          transform="translate(0 18)"
        />
        <path
          d="M843.064 688.515h173.803v235.924H843.064z"
          style={{
            display: 'inline',
            fill: '#976d3e',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M816.907 924.439V673.083h12.512v251.356zM1030.392 924.439V673.083h12.512v251.356z"
          style={{
            fill: '#88683c',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M829.42 924.439h13.644V688.515h172.37l1.434 235.924h13.524V673.083H829.419ZM1042.904 807.659h35.37v-56.583h-35.37zM1042.904 921.659h35.37v-56.583h-35.37zM781.538 921.659h35.37v-56.583h-35.37zM781.538 807.659h35.37v-56.583h-35.37z"
          style={{
            fill: '#5d3617',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M851.246 673.083h-20.138V274.969h7.14v-30.277h63.21s-31.93 24.772-40.778 34.21c-8.847 9.437-6.597 27.587-5.762 30.88.836 3.294 3.384 13.554 3.384 13.554l-6.778 8.581zM1008.254 673.083h20.138V274.969h-7.14v-30.277h-63.21s30.951 28.578 39.799 38.016c8.847 9.437 4.193 18.484 3.357 21.777-.835 3.293 0 18.85 0 18.85l6.778 8.582z"
          style={{
            fill: '#ac9366',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M866.848 272.641h123.638v400.441H866.848z"
          style={{
            display: 'inline',
            fill: '#9a8053',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M831.108 274.97v-4.58H869.4l-5.103 4.503zM859.68 270.39v-21.238h37.83v1.758h-35.742v19.48zM1028.392 274.97v-4.58H990.1l5.103 4.503zM999.82 270.39v-21.238h-37.83v1.758h35.742v19.48z"
          style={{
            fill: '#5d3617',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M851.246 673.083h18.09v-228.13h6.64V423.47h6.25V352.19s-19.094-19.876-10.32-41.632c8.774-21.755 27.765-19.592 34.977-22.837 7.212-3.245 13.703-15.041 13.703-15.041h9.99v-43.975h-22.851s-2.661 13.093-12.044 20.447c-9.382 7.354-42.001 28.667-42.099 44.888-.097 16.221 4.72 29.296 4.72 29.296l-6.778 8.581z"
          style={{
            fill: '#5d3617',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M1008.576 673.083h-18.09v-228.13h-6.64V423.47h-6.25V352.19s19.094-19.876 10.32-41.632c-8.775-21.755-27.766-19.592-34.977-22.837-7.212-3.245-13.703-15.041-13.703-15.041h-9.99v-43.975h22.851s2.661 13.093 12.044 20.447c9.382 7.354 42.001 28.667 42.099 44.888.097 16.221-4.72 29.296-4.72 29.296l6.777 8.581zM1028.392 377.6v30.682h12.503l5.184-31.277z"
          style={{
            fill: '#5d3617',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M843.064 747.515h28.445v54.839h-28.445zM907.748 747.515h42.78v54h-42.78zM989.509 747.515h26.612v54h-26.612zM842.976 868.168h28.445v54.839h-28.445zM907.66 868.168h42.78v54.509h-42.78zM989.421 868.168h27.447v56.186h-27.447z"
          style={{
            fill: '#563d21',
            fillOpacity: 1,
            stroke: '#5f391e',
            strokeWidth: 0,
            strokeDasharray: 'none',
            strokeOpacity: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M1028.392 377.6v30.682h12.503l5.184-31.277zM831.108 377.6v30.682h-12.503l-5.184-31.277zM897.344 477.806h13.769v75.473h-13.769zM897.344 561.806h13.769v75.473h-13.769zM897.344 645.806h13.769v27.277h-13.769zM923.344 645.806h13.769v27.277h-13.769zM949.344 645.806h13.769v27.277h-13.769zM923.344 561.806h13.769v75.473h-13.769zM949.344 561.806h13.769v75.473h-13.769zM923.344 477.806h13.769v75.473h-13.769zM949.344 477.806h13.769v75.473h-13.769zM885.849 457.799h86.902v10.577h-86.902zM882.227 352.19h95.369v14.442h-95.369z"
          style={{
            fill: '#5d3617',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M906.763 325.703h45.715v26.487h-45.715z"
          style={{
            fill: '#423022',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          d="M882.227 352.19v-1.83h7.807v-2.464h12.324s-.403-14.98 4.405-22.193c4.808-7.212 13.582-10.096 15.265-11.539 1.683-1.442 7.883-7.933 7.883-7.933v19.713s-12.69.12-17.138 7.452c-4.447 7.332-3.486 18.794-3.486 18.794zM977.629 352.19v-1.83h-7.808v-2.464h-12.324s.403-14.98-4.405-22.193c-4.807-7.212-13.582-10.096-15.265-11.539-1.682-1.442-7.882-7.933-7.882-7.933v19.713s12.69.12 17.138 7.452c4.447 7.332 3.485 18.794 3.485 18.794z"
          style={{
            fill: '#5d3617',
            fillOpacity: 1,
            stroke: '#000',
            strokeWidth: 0,
            paintOrder: 'stroke fill markers',
          }}
        />
        <path
          fill="none"
          d="M894.978 378.03h69.18v63.861h-69.18z"
          style={{
            fill: '#9a8053',
            fillOpacity: 0,
            stroke: '#5f3b20',
            strokeWidth: 2,
            strokeDasharray: 'none',
            strokeOpacity: 1,
            paintOrder: 'stroke fill markers',
          }}
        />
        <circle
          cx={931.702}
          cy={413.184}
          r={2.469}
          style={{
            fill: '#5f3c20',
            fillOpacity: 1,
            fillRule: 'evenodd',
          }}
        />
        <path
          d="m917.938 382.25 11.44 31.77.865.335 2.795-1.629.84-.707z"
          style={{
            fill: '#5f3c20',
            fillOpacity: 1,
            stroke: '#5f3b20',
            strokeWidth: 0,
            strokeDasharray: 'none',
            strokeOpacity: 1,
            paintOrder: 'stroke fill markers',
          }}
        />
        <text
          xmlSpace="preserve"
          x={960.228}
          y={428.433}
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontStretch: 'normal',
            fontSize: '10.6667px',
            lineHeight: 1.25,
            fontFamily: 'Poppins',
            // InkscapeFontSpecification: '&quot',
            textAlign: 'end',
            textAnchor: 'end',
            fill: '#520',
          }}
        >
          <tspan
            x={960.228}
            y={428.433}
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontFamily: 'Poppins',
              // InkscapeFontSpecification: '&quot',
            }}
          >
            {'4'}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          x={960.537}
          y={414.114}
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontStretch: 'normal',
            fontSize: '10.6667px',
            lineHeight: 1.25,
            fontFamily: 'Poppins',
            // InkscapeFontSpecification: '&quot',
            textAlign: 'end',
            textAnchor: 'end',
            fill: '#520',
          }}
        >
          <tspan
            x={960.537}
            y={414.114}
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontFamily: 'Poppins',
              // InkscapeFontSpecification: '&quot',
            }}
          >
            {'3'}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          x={958.661}
          y={400.458}
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontStretch: 'normal',
            fontSize: '10.6667px',
            lineHeight: 1.25,
            fontFamily: 'Poppins',
            // InkscapeFontSpecification: '&quot',
            textAlign: 'end',
            textAnchor: 'end',
            fill: '#520',
          }}
        >
          <tspan
            x={958.661}
            y={400.458}
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontFamily: 'Poppins',
              // InkscapeFontSpecification: '&quot',
            }}
          >
            {'2'}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          x={948.152}
          y={390.285}
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontStretch: 'normal',
            fontSize: '10.6667px',
            lineHeight: 1.25,
            fontFamily: 'Poppins',
            // InkscapeFontSpecification: '&quot',
            textAlign: 'end',
            textAnchor: 'end',
            fill: '#520',
          }}
        >
          <tspan
            x={948.152}
            y={390.285}
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontFamily: 'Poppins',
              // InkscapeFontSpecification: '&quot',
            }}
          >
            {'1'}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          x={934.859}
          y={389.313}
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontStretch: 'normal',
            fontSize: '10.6667px',
            lineHeight: 1.25,
            fontFamily: 'Poppins',
            // InkscapeFontSpecification: '&quot',
            textAlign: 'end',
            textAnchor: 'end',
            fill: '#520',
          }}
        >
          <tspan
            x={934.859}
            y={389.313}
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontFamily: 'Poppins',
              // InkscapeFontSpecification: '&quot',
            }}
          >
            {'12'}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          x={917.109}
          y={390.285}
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontStretch: 'normal',
            fontSize: '10.6667px',
            lineHeight: 1.25,
            fontFamily: 'Poppins',
            // InkscapeFontSpecification: '&quot',
            textAlign: 'end',
            textAnchor: 'end',
            fill: '#520',
          }}
        >
          <tspan
            x={917.109}
            y={390.285}
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontFamily: 'Poppins',
              // InkscapeFontSpecification: '&quot',
            }}
          >
            {'11'}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          x={908.935}
          y={400.319}
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontStretch: 'normal',
            fontSize: '10.6667px',
            lineHeight: 1.25,
            fontFamily: 'Poppins',
            // InkscapeFontSpecification: '&quot',
            textAlign: 'end',
            textAnchor: 'end',
            fill: '#520',
          }}
        >
          <tspan
            x={908.935}
            y={400.319}
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontFamily: 'Poppins',
              // InkscapeFontSpecification: '&quot',
            }}
          >
            {'10'}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          x={904.935}
          y={414.604}
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontStretch: 'normal',
            fontSize: '10.6667px',
            lineHeight: 1.25,
            fontFamily: 'Poppins',
            // InkscapeFontSpecification: '&quot',
            textAlign: 'end',
            textAnchor: 'end',
            fill: '#520',
          }}
        >
          <tspan
            x={904.935}
            y={414.604}
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontFamily: 'Poppins',
              // InkscapeFontSpecification: '&quot',
            }}
          >
            {'9'}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          x={906.935}
          y={428.888}
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontStretch: 'normal',
            fontSize: '10.6667px',
            lineHeight: 1.25,
            fontFamily: 'Poppins',
            // InkscapeFontSpecification: '&quot',
            textAlign: 'end',
            textAnchor: 'end',
            fill: '#520',
          }}
        >
          <tspan
            x={906.935}
            y={428.888}
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontFamily: 'Poppins',
              // InkscapeFontSpecification: '&quot',
            }}
          >
            {'8'}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          x={917.544}
          y={437.55}
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontStretch: 'normal',
            fontSize: '10.6667px',
            lineHeight: 1.25,
            fontFamily: 'Poppins',
            // InkscapeFontSpecification: '&quot',
            textAlign: 'end',
            textAnchor: 'end',
            fill: '#520',
          }}
        >
          <tspan
            x={917.544}
            y={437.55}
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontFamily: 'Poppins',
              // InkscapeFontSpecification: '&quot',
            }}
          >
            {'7'}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          x={932.608}
          y={439.141}
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontStretch: 'normal',
            fontSize: '10.6667px',
            lineHeight: 1.25,
            fontFamily: 'Poppins',
            // InkscapeFontSpecification: '&quot',
            textAlign: 'end',
            textAnchor: 'end',
            fill: '#520',
          }}
        >
          <tspan
            x={932.608}
            y={439.141}
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontFamily: 'Poppins',
              // InkscapeFontSpecification: '&quot',
            }}
          >
            {'6'}
          </tspan>
        </text>
        <text
          xmlSpace="preserve"
          x={948.824}
          y={438.136}
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontStretch: 'normal',
            fontSize: '10.6667px',
            lineHeight: 1.25,
            fontFamily: 'Poppins',
            // InkscapeFontSpecification: '&quot',
            textAlign: 'end',
            textAnchor: 'end',
            fill: '#520',
          }}
        >
          <tspan
            x={948.824}
            y={438.136}
            style={{
              fontStyle: 'normal',
              fontVariant: 'normal',
              fontWeight: 600,
              fontStretch: 'normal',
              fontFamily: 'Poppins',
              // InkscapeFontSpecification: '&quot',
            }}
          >
            {'5'}
          </tspan>
        </text>
        <path
          d="M871.51 688.515v234.162"
          style={{
            fill: '#563d22',
            fillOpacity: 1,
            stroke: '#5f391e',
            strokeWidth: 2.01003,
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeDasharray: 'none',
            strokeOpacity: 1,
          }}
        />
        <path
          d="M1016.868 923.515H843.064M1016.868 867.515H843.064M1016.868 801.515H843.064M1016.868 747.515H843.064"
          style={{
            fill: '#2c2511',
            fillOpacity: 1,
            stroke: '#5f391e',
            strokeWidth: 1.67722,
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeDasharray: 'none',
            strokeOpacity: 1,
          }}
        />
        <path
          d="M899.51 688.515v234.162M929.51 688.515v234.162M959.51 688.515v234.162M989.51 688.515v234.162"
          style={{
            fill: '#2c2511',
            fillOpacity: 1,
            stroke: '#5f391e',
            strokeWidth: 2.01003,
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeDasharray: 'none',
            strokeOpacity: 1,
          }}
        />
      </g>
    </svg>
  )
}
