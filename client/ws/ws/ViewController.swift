//
//  ViewController.swift
//  ws
//
//  Created by Eduard Moldovan on 17/09/15.
//  Copyright © 2015 eduardmoldovan.com. All rights reserved.
//

import UIKit
import Socket_IO_Client_Swift

class ViewController: UIViewController {
    let socket = SocketIOClient(socketURL: "localhost:8001"/*, opts: [
        "log": true]*/)

    @IBOutlet weak var response: UITextField!

    override func viewDidLoad() {
        super.viewDidLoad()

        self.socket.on("connect") {data, ack in
            self.response.text = "connected"
        }

        self.socket.on("yo") {data, ack in
            if let text = data?[0] as? String {
                self.response.text = text
            }
        }

        self.socket.connect()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func emit(sender: AnyObject) {
        self.socket.emit("init", "string")
    }
    
}
