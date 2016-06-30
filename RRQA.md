## RR q/a


###### **Q** *How much packets can be lost before mqtt client cannot connect and/or cannot transfer data.*
###### **Q** *How much network delay before mqtt client cannot connect and/or cannot transfer data.*

Tese questions are revealing misunderstanding of the MQTT place at networking stack. MQTT is an application layer protocol that runs on top of an underlying transport protocol TCP, which in turn relies on IP protocol. MQTT is not a custom internet protocol and all the knowledge gathered over decades of usage TCP/IP stack in lossy connectivity applies to MQTT by default.

Basic OSI network model:

![](http://www.windowsnetworking.com/img/upl/image0011210155736818.jpg)

MQTT place in OSI:

![](http://www.hivemq.com/wp-content/uploads/mqtt-tcp-ip-stack.png)

Hence the package loss and the connection avaliability is resolved by lower level (transport level) devices and drivers of the networking equipment on the vessel. MQTT provides a lightweight robust signaling mechanism. Tha package loss resolution is under TCP/IP stack control. MQTT will start failing as soon as any of the TCP/IP connections with the ground will be failing. In case the connection is slow, lossy and not even but still can be managed by the networking equipment on the vessel, MQTT will continue working provising additional layer of robustness on application level.

###### **Q** *The proof of concept shall include the security layer in order to verify the MQTT performance towards the bandwidth constraints. This means it shall be tested with payload encryption and secure tunnel separately.*

MQTT imlementation in Microsoft Azure IoT Suit does not allow to use unsecured connection. Any connection established between device and IoT Hub **must** and **only can be** established as secured over TLS/SSL

>**Microsoft manuals:** IoT Hub enables devices to communicate with the IoT Hub device endpoints using the MQTT v3.1.1 protocol on port 8883. IoT Hub requires all device communication to be secured using TLS/SSL.

**Tunelling**: It is a common use case that MQTT clients are behind routers, which are using network address translation (NAT) in order to translate from a private network address (like 192.168.x.x, 10.0.x.x) to a public facing one. As already mentioned the MQTT client is doing the first step by sending a CONNECT message.
As each connection **must be** initiated by client and client **always** connects to the public address of the Hub, tunelling is not an issue in the chosen technology stack.

**Additional payload encription**: as soon as signal is moved down to the transport level of the stack of network and split into TCP packets it is encrypted by TSL/SSL as required by protocol connection, then the TCP packets are moved down ti IP and futhert to physical network connection, ed. satelite. 

Additional encryption of the payload is possible and can be implemented. Main concern here is how necessary it is at proof of concept as the only resources which will encrypt the payload are located at the vessel application (eg. cloud connectivity actor) and the decryption is happening at the cloud application level (eg. IoT hub listeners at Azure backend). No additional processing of the payload is needed as transport level encryption is happening at the networking equippent of the vessel and Azure Data Center.

###### **Q** *Cost of virtual vessels ( VM’s) in the range of 100, 200, 500 and 1000*

Assuming that the deployment of the visrual vessel will be happening in the virtual machines provided by Azure, and we need at least 1 VM to simulate 10 virtual vessels in one world region.

The cost includes not only the VMs themselves but also a cos of the work to set the automation procedure to provision and deprovision them on demand having the software running that will be sending near same signals as real vessel at the desired speed and rate and with the desired bandwidth.

*Here are preliminary calculations*

Cost of one VM of 4 cores, 14GB RAM, 200GB SSD is **€0.2462/hr**
The running tests time with different configurations (100, 200, 500 and 1000 vessels) is 24 hours each group of tests: total **96 hours**

Hence:

|100 vessels|200 vessels|500 vessels|1000 vessels			 |
|---		|---		|---		|---		 			 |
|**10VM**	|**20VM**	|**50VM**	|**100VM**	 			 |
|24h		|24h		|24h		|24h		 			 |
|€59.088	|€118.176	|€295.44	|€590.88	 			 |
|---		|---		|---		|**TOTAL:**	€1063.584	 |

Plus additional labour costs on implementing the provisioning automation process over docker containers.

###### **Q** *Simulate a connection with 100kbps, 10% packet loss and 1000ms delay and check connection and data transfer.*
###### **Q** *Simulate a connection with 10Mbps, 1% packet loss and 50ms delay and check connection and data transfer.*

Simulation is implemented using network controlling instruments like NetLimiter that provides:

-Full internet bandwidth control over applications and computers
-Powerful connection blocker
-Long-term internet traffic statistics
-Fully customizable behaviour using user-defined Rules and Filters

All the statistics can be gathered over Azure Application Insights utilizing custom events recording mechanism and the results for different configurations may be compared using Azure reporting tools for IoT hub and Azure Application Insights report builder.


