function Camera(input) {
    // The following two parameters will be used to automatically create the cameraWorldMatrix in this.update()
    this.cameraYaw = 0;
    this.cameraPosition = new Vector3();

    this.cameraWorldMatrix = new Matrix4();

    // -------------------------------------------------------------------------
    this.getViewMatrix = function() {
        return this.cameraWorldMatrix.clone().inverse();
    }

    // -------------------------------------------------------------------------
    this.getForward = function() {
        //DONE
        // todo #6 - pull out the forward direction from the world matrix and return as a vector
        //         - recall that the camera looks in the "backwards" direction
        return new Vector3(
            this.cameraWorldMatrix.elements[2],
            this.cameraWorldMatrix.elements[6],
            this.cameraWorldMatrix.elements[10],
        );
    }
    // -------------------------------------------------------------------------
    this.update = function(dt) {
        var currentForward = this.getForward();
        var t = currentForward.multiplyScalar(dt);

        if (input.up) {
            // todo #7 - move the camera position a little bit in its forward direction
            this.cameraPosition.subtract(t);
            //this.cameraWorldMatrix.makeTranslation(this.cameraPosition);
        }

        if (input.down) {
            // todo #7 - move the camera position a little bit in its backward direction
            this.cameraPosition.add(t);
        }

        if (input.left) {
            // todo #8 - add a little bit to the current camera yaw
            this.cameraYaw += 0.2;
        }

        if (input.right) {
            // todo #8 - subtract a little bit from the current camera yaw
            this.cameraYaw -= 0.2;
        }

        // todo #7 - create the cameraWorldMatrix from scratch based on this.cameraPosition
        this.cameraWorldMatrix.makeIdentity();
        this.cameraWorldMatrix.makeTranslation(this.cameraPosition);
        // todo #8 - create a rotation matrix based on cameraYaw and apply it to the cameraWorldMatrix
        var rotations = new Matrix4().makeRotationY(this.cameraYaw);
        this.cameraWorldMatrix.multiply(rotations);

    }
}